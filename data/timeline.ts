import type { TimelineJSJSON } from '../types'

export const data = {
  title: {
    media: {
      url: 'http://www.germuska.com/salzburg-album/full/2QVB_022.jpg',
      caption: 'The secret passage at Schloss Leopoldskron, Salzburg, Austria',
      credit: 'Joe Germuska',
    },
    text: {
      headline: 'TimelineJS Media Types',
      text: '<p>TimelineJS supports many media types. This provides a simple way to test them all. This page tests a simple image on a remote server.</p>',
    },
  },
  events: [{
    id: 'youtube',
    media: {
      url: 'https://www.youtube.com/watch?v=pi2v1m6gmD8&t=5m21s',
      caption: 'the Monkey section of David Van Tieghem\'s <em>Ear Drums</em>',
    },
    start_date: {
      year: '1901',
    },
    text: {
      headline: 'YouTube Videos',
      text: '<p>if Timeline finds a URL that starts with \'youtube.com\' or \'youtu.be\', it will try to use it to embed a YouTube video. The <em>protocol</em> part of the URL (e.g. <em>https://</em>) is technically optional.</p><p>You can start at a specific point in the video using the <code>t=#m#s</code> parameter: see <a href=\'http://youtubetime.com/\'>http://youtubetime.com/</a></p>',
    },
  },
  {
    id: 'vimeo',
    media: {
      url: 'http://vimeo.com/20839673',
      caption: '<em>Phat Tai</em>, a story of Vietnamese fishermen on the Gulf Coast.',
      credit: 'Joe York/Southern Foodways Alliance',
    },
    start_date: {
      year: '1902',
    },
    text: {
      headline: 'Vimeo',
      text: 'To embed a Vimeo video, just copy the URL of the Vimeo.com page which shows the video.',
    },
  },
  ],
}
