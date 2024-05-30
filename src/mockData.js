/**
 * Mock data for a example page collection with with a blocks field (content)
 */
export const blockMockData = {
  id: 2,
  type: 'default',
  title: 'Impressum',
  slug: 'impressum',
  content: [{
    id: '660729a4044c6452421b06e9',
    type: 'default',
    blockName: null,
    blockType: 'pageTitle',
    containerSettings: { width: 'xs', alignment: 'center' },
    title: 'Heading for BlockPageTitle component',
    subtext: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [{
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [{
            mode: 'normal',
            text: 'This text is defined in PayloadCMSs Lexical Editor. It\'s a group field with the name "subtext". In your custom Block component you can consume any fields you\'ve defined in the collection.',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          }],
          direction: 'ltr',
        }],
        direction: 'ltr',
      },
    },
  }, {
    id: '660729f4044c6452421b06ea',
    blockName: null,
    layout: [{
      containerSettings: { width: 'lg', alignment: 'left' },
      columns: '1',
      content1: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [{
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [{
              mode: 'normal',
              text: 'Hey, danke, dass du vorbeischaust! Hier sind die offiziellen Infos, die ich laut Gesetz angeben muss. Wenn du Fragen hast, zögere nicht, mich zu kontaktieren.',
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1,
            }],
            direction: 'ltr',
          }],
          direction: 'ltr',
        },
      },
      content2: null,
      content3: null,
      id: '660729f8044c6452421b06eb',
    }, {
      containerSettings: { width: 'md', alignment: 'left' },
      columns: '2',
      content1: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [{
            tag: 'h3',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,
            children: [{ mode: 'normal', text: 'Person', type: 'text', style: '', detail: 0, format: 0, version: 1 }],
            direction: 'ltr',
          }, {
            tag: 'ul',
            type: 'list',
            start: 1,
            format: '',
            indent: 0,
            version: 1,
            children: [{
              type: 'listitem',
              value: 1,
              format: '',
              indent: 0,
              version: 1,
              children: [{
                mode: 'normal',
                text: 'Marco Freiberger',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              }],
              direction: 'ltr',
            }, {
              type: 'listitem',
              value: 2,
              format: '',
              indent: 0,
              version: 1,
              children: [{
                mode: 'normal',
                text: 'Pfarrsweg 21, Lechaschau ',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              }],
              direction: 'ltr',
            }],
            listType: 'bullet',
            direction: 'ltr',
          }],
          direction: 'ltr',
        },
      },
      content2: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [{
            tag: 'h3',
            type: 'heading',
            format: '',
            indent: 0,
            version: 1,
            children: [{ mode: 'normal', text: 'Kontakt', type: 'text', style: '', detail: 0, format: 0, version: 1 }],
            direction: 'ltr',
          }, {
            tag: 'ul',
            type: 'list',
            start: 1,
            format: '',
            indent: 0,
            version: 1,
            children: [{
              type: 'listitem',
              value: 1,
              format: '',
              indent: 0,
              version: 1,
              children: [{
                type: 'autolink',
                fields: { url: 'mailto:marco@freibergersyntax.dev', linkType: 'custom' },
                format: '',
                indent: 0,
                version: 2,
                children: [{
                  mode: 'normal',
                  text: 'marco@freibergersyntax.dev',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                }],
                direction: 'ltr',
              }],
              direction: 'ltr',
            }],
            listType: 'bullet',
            direction: 'ltr',
          }],
          direction: 'ltr',
        },
      },
      content3: null,
      id: '66072a03044c6452421b06ec',
    }],
    blockType: 'layout',
  }],
  meta: { title: 'Impressum', description: null },
  updatedAt: '2024-04-05T14:30:23.597Z',
  createdAt: '2024-03-30T13:37:52.133Z',
  _status: 'published',
}
export const pageMockData = {

  id: 5,
  type: 'default',
  title: 'Test',
  slug: 'test',

  content: [
    {
      id: '6657526206cbda0054bc890d',
      type: 'default',
      blockName: null,
      blockType: 'pageTitle',

      containerSettings: {

        width: 'md',
        alignment: 'left',

      },
      title: 'Test Site',
      subtext: {

        root: {

          type: 'root',
          format: '',
          indent: 0,
          version: 1,

          children: [

            {

              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,

              children: [

                {
                  mode: 'normal',
                  text: 'Test subheading',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
          ],
          direction: 'ltr',
        },
      },

    },
    {

      id: '6657526206cbda0054bc890f',
      blockName: null,

      layout: [

        {

          containerSettings: {

            width: 'md',
            alignment: 'left',

          },
          columns: '1',
          content1: {

            root: {

              type: 'root',
              format: '',
              indent: 0,
              version: 1,

              children: [

                {

                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [

                    {
                      mode: 'normal',
                      text: 'Test data from a lexical editor',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',

                },
                {
                  type: 'block',
                  fields: {
                    id: '665754a0793e160363b4b2ea',
                    text: {
                      type: 'primary',
                      alignment: 'left',
                      ctaButtonText: 'Call to Action Block within Lexical Editor!',
                    },
                    blockName: '',
                    blockType: 'callToAction',
                  },
                  format: '',
                  version: 2,
                },
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'More data from another paragraph, above should be a CTA block',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: null,
                },
              ],
              direction: 'ltr',
            },
          },
          content2: null,
          content3: null,
          id: '6657526206cbda0054bc890e',
        },
      ],
      blockType: 'layout',
    },

  ],

  meta: {
    title: null,
    description: null,
  },
  updatedAt: '2024-05-29T16:15:57.768Z',
  createdAt: '2024-05-29T16:05:54.033Z',
  _status: 'draft',

}
