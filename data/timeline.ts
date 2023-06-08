import type { Data, Options } from '../types'

export const data: Data = {
  // title: {
  //   start_date: {
  //     year: 2020,
  //     month: 1,
  //     day: 1,

  //   },
  //   text: {
  //     headline: 'TimelineJS Media Types',
  //     text: '<p>TimelineJS supports many media types. This provides a simple way to test them all. This page tests a simple image on a remote server.</p>',
  //   },
  // },
  events: [
    {
      start_date: {
        year: 2020,
        month: 1,
        day: 1,
      },
    },
  ],
  eras: [
    {
      start_date: {
        year: 2020,
        month: 1,
        day: 1,
      },
      end_date: {
        year: 2020,
        month: 5,
        day: 1,
      },
    },
    {
      start_date: {
        year: 2020,
        month: 6,
        day: 10,
      },
      end_date: {
        year: 2020,
        month: 7,
        day: 1,
      },
    },
  ],
}

export const options: Options = {
  height: 100,
  language: 'zh-cn',
  timenav_position: 'top',

}
