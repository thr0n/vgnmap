import { test, expect } from '@playwright/test';

const json = {
  sys: {
    type: 'Array'
  },
  total: 1,
  skip: 0,
  limit: 100,
  items: [
    {
      metadata: {
        tags: []
      },
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: 'ya0yqfyw5p7y'
          }
        },
        id: '4ABKrebJZ78athM8AuG2a1',
        type: 'Entry',
        createdAt: '2021-11-03T12:33:33.611Z',
        updatedAt: '2024-02-22T12:42:17.246Z',
        environment: {
          sys: {
            id: 'master',
            type: 'Link',
            linkType: 'Environment'
          }
        },
        revision: 3,
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'restaurant'
          }
        },
        locale: 'en-US'
      },
      fields: {
        name: 'innerluck',
        position: {
          lon: 9.943956,
          lat: 53.59126
        },
        address: {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: '1yjXR4RhU4JukSruTAlWPU'
          }
        },
        website: 'https://innerluck.de',
        restaurantType: ['vegan'],
        menu: ['Burger', 'Bowls', 'Kuchen'],
        locations: [
          {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '1yjXR4RhU4JukSruTAlWPU'
            }
          }
        ]
      }
    }
  ],
  includes: {
    Entry: [
      {
        metadata: {
          tags: []
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ya0yqfyw5p7y'
            }
          },
          id: '01fFn5e0C2NDwYKpbxyro',
          type: 'Entry',
          createdAt: '2022-09-22T15:00:44.509Z',
          updatedAt: '2024-02-15T07:43:04.145Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment'
            }
          },
          revision: 2,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'address'
            }
          },
          locale: 'en-US'
        }
      },
      {
        metadata: {
          tags: []
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ya0yqfyw5p7y'
            }
          },
          id: '1yjXR4RhU4JukSruTAlWPU',
          type: 'Entry',
          createdAt: '2021-11-03T12:44:49.786Z',
          updatedAt: '2024-02-22T12:41:27.686Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment'
            }
          },
          revision: 2,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'address'
            }
          },
          locale: 'en-US'
        },
        fields: {
          street: 'Hagenbeckstraße 132',
          zip: '22527',
          city: 'Hamburg',
          country: 'Deutschland',
          position: {
            lat: 53.59126,
            lon: 9.943956
          }
        }
      }
    ]
  }
};

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4173');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/vgnmap/);
});

test('get started link', async ({ page }) => {
  await page.route('**/*/entries?content_type=restaurant', async (route) => {
    await route.fulfill({ json });
  });

  await page.goto('http://localhost:4173');
  await page.getByText('innerluck').click();

  await expect(page.getByText('Hagenbeckstraße 132')).toBeVisible();
});
