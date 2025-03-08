import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGDebugger/1.0; +https://www.scid110.com)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: 500 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const ogTags: Record<string, any> = {};

    // Extract all meta tags
    $('meta').each((_, element) => {
      const property = $(element).attr('property') || $(element).attr('name');
      const content = $(element).attr('content');

      if (property && content) {
        // Handle Open Graph tags
        if (property.startsWith('og:')) {
          const key = property.replace('og:', '');
          
          // Handle arrays like og:image, og:image:width, etc.
          if (key.includes(':')) {
            const [mainKey, subKey] = key.split(':');
            
            if (!ogTags[`og${mainKey.charAt(0).toUpperCase() + mainKey.slice(1)}`]) {
              ogTags[`og${mainKey.charAt(0).toUpperCase() + mainKey.slice(1)}`] = {};
            }
            
            ogTags[`og${mainKey.charAt(0).toUpperCase() + mainKey.slice(1)}`][subKey] = content;
          } else {
            ogTags[`og${key.charAt(0).toUpperCase() + key.slice(1)}`] = content;
          }
        }
        
        // Handle Twitter card tags
        else if (property.startsWith('twitter:')) {
          const key = property.replace('twitter:', '');
          ogTags[`twitter${key.charAt(0).toUpperCase() + key.slice(1)}`] = content;
        }
      }
    });

    // Get title as fallback
    if (!ogTags.ogTitle) {
      ogTags.title = $('title').text();
    }

    // Get canonical URL as fallback
    if (!ogTags.ogUrl) {
      const canonical = $('link[rel="canonical"]').attr('href');
      if (canonical) {
        ogTags.canonicalUrl = canonical;
      }
    }

    return NextResponse.json(ogTags);
  } catch (error) {
    console.error('Error fetching OG data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
} 