export type HornetUser = {
  id: number,
  /** Primary human-readable name displayed in profile */
  display_name: string,
  headline: string,
  /** Description, max. 256 chars, same as `bio` */
  about_you: string,
  /** Height in local units */
  height: number,
  /** Weight in milligrams (kg*1000) */
  weight: number,
  show_distance: boolean,
  preferred_language: string,
  location: string,
  /** Description, max. 256 chars, same as `about_you` */
  bio: string,
  explorer: boolean,
  online: boolean,
  crowned: boolean,
  status_icon: 'online' | 'offline',
  recent_hearts_sent: number,
  visible: boolean,
  system_profile: boolean,
  broadcast_profile: boolean,
  show_onboarding: boolean,
  interests: {
    hashtags: {
      hashtag: {
        title: string
      }
    }[]
  },
  age: number,
  /** Date of birth, format: `YYYY-01-01` */
  date_of_birth: string,
  /** Profile creation date in ISO format */
  created_at: string,
  account: {
    username: string,
    username_claimed: boolean,
    public: boolean
  },
  /** Relationship status, local language */
  relationship: {
    id: number,
    title: string
  } | null,
  /** Ethnicity, local language */
  ethnicity: {
    id: number,
    title: string
  } | null,
  /** Sexual role, local language */
  identity: {
    id: number,
    title: string
  } | null,
  /** Unit of measure, local language */
  unit_of_measure: {
    id: number,
    title: string
  },
  gender: null,
  sexuality: null,
  pronouns: null,
  /** HIV status, local language */
  know_your_status: {
    /** Date, format: `YYYY-MM-DD` */
    last_tested: string,
    hiv_status: {
      id: number,
      title: string
    }
  },
  looking_fors: {
    id: number,
    title: string
  }[],
  gallery: {
    count: 0,
    previews: {
      photo: {
        id: number
        state: string
        slot: number
        is_public: boolean
        is_primary: boolean
        url: string
        full_url: string
        full_large_url: string
        thumbnail_url: string
        thumbnail_large_url: string
        square_url: string
        v6_full_url: string
      }
    }[]
  },
  public: number,
  private: number,
  city: null,
  photos: {
    photo: {
      id: number,
      state: string,
      slot: number,
      is_public: boolean,
      is_primary: boolean,
      url: string
      full_url: string
      full_large_url: string
      thumbnail_url: string
      thumbnail_large_url: string
      square_url: string
      v6_full_url: string
    }
  }[],
  public_user_video_feed_entry_id: null,
  community_badges: [],
  /** Last online date, ISO format */
  last_online: string,
  private_photos_accessible: boolean,
  favourite: boolean,
  fan: boolean,
  /** Distance in KM */
  distance: number,
  unread_messages_from: number,
  msgs: number,
  note: null | string,
  private_photo_access: 'none' | 'granted',
  my_private_photos_access: 'none' | 'granted',
  spaces_count: number,
  followers: [],
  followers_count: number,
  followed_count: number,
  posts_count: number,
  verification_level: number,
  broadcast_started_at: null,
  vpaas_id: null
}