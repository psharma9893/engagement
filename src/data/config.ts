/**
 * ALL EDITABLE ENGAGEMENT TEXT LIVES HERE.
 * Change names, date, time, venue, contacts and wording in this file only.
 * A field left as '' is hidden on the site.
 */
export const config = {
  couple: {
    first: 'Pranshu', // groom's side: Pranshu first
    second: 'Nishtha',
  },

  event: {
    name: 'The Engagement',
    dateLabel: 'Sunday, 6th December 2026',
    dateShort: '06 · 12 · 2026',
    timeLabel: '11:00 AM – 5:00 PM',
    startISO: '2026-12-06T11:00:00+05:30',
    endISO: '2026-12-06T17:00:00+05:30',
    venue: 'Royal Pepper Resorts',
    /** Hall within the venue — shown softly under the venue on the details card ('' = hidden) */
    hall: 'Majestic Hall',
    mapsUrl: 'https://maps.app.goo.gl/r9jxGu99wenfUFJZ7',
    dressCode: 'Suits, Gowns & Good Vibes',
    /** Order of the day, shown quietly inside The Engagement card (empty list = hidden) */
    timeline: [
      { time: '11:30 AM – 1:00 PM', label: 'Tilak, followed by Lagan' },
      { time: '1:00 – 2:30 PM', label: 'Lunch' },
      { time: '2:30 – 4:00 PM', label: 'Ring Ceremony' },
    ],
  },

  envelope: {
    eyebrow: 'You are invited to the engagement of',
    line: 'Sunday, 6th December 2026 · Royal Pepper Resorts',
    hint: 'Tap the envelope to open',
  },

  /** Host line on the details page (chosen by Pranshu). */
  host: {
    blessing: 'By the grace of God',
    parents: 'Mrs. Renu & Mr. Harish Kumar Sharma',
    invite: 'joyfully invite you to an afternoon honouring the engagement of their son',
    joiner: 'with',
  },

  rsvp: {
    welcome: 'Dearest Family and Friends,',
    message:
      'We would be delighted to have you with us as Pranshu & Nishtha exchange rings.',
    contacts: [
      { name: 'Priya', phone: '+91 73874 24280' },
      { name: 'Gaurav', phone: '+91 99990 40244' },
    ],
    whatsappMessage: "Hi! We've received Pranshu & Nishtha's engagement invitation and would love to RSVP.",
  },

  closing: { signoff: 'We can’t wait to celebrate with you.' },

  music: { src: 'audio/bgm.mp3', volume: 0.55 },

  share: {
    title: 'Pranshu & Nishtha · Engagement · 6 December 2026',
    description: 'You are invited to the engagement of Pranshu & Nishtha — Sunday, 6th December 2026, 11 AM to 5 PM, Royal Pepper Resorts.',
    themeColor: '#e4c3bb',
  },
};
