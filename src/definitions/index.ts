export type HornetMember = {
  id: number
  account: {
    username: string
    public: boolean
  },
  display_name: string
  thumbnail_url: string
  explorer: boolean,
  online: boolean,
  status_icon: 'online' | 'offline',
  last_online: string
  favourite: boolean,
  fan: boolean,
  my_private_photos_access: boolean,
  private_photo_access: 'none' | 'granted',
  private_photos_accessible: boolean,
  system_profile: boolean,
  broadcast_profile: boolean,
  verification_level: number
  last_read_at: string
}

export type getMessagesRequest = {
  per_page: number
  profile_id: number
  before?: string
}

export type getMessagesResponse = {
  inbox: null
  inboxes: null
  member: HornetMember
  messages: getMessagesResponse_Message[]
  pagination: { previous: string }
  possible_spammer: boolean
  sending_disabled: boolean
  sending_disabled_reason: null
}

export type getMessagesResponse_Message = {
  message: {
    client_ref: string
    created_at: string
    data: getMessagesResponse_Data
    id: number
    is_deletable: boolean
    message_id: string
    parent_message: null
    reacted_to_by_me_with: null | number
    reaction_counts: getMessagesResponse_Message_Reaction[]
    real_id: string
    recipient: number
    sender: number
    state: 'read'
    type: 'chat'
  }
}

export type getMessagesResponse_Data = string | {
  photo_id: number
  member_id: number
  thumb_retina_url: string
  photo_url: string
}

export type getMessagesResponse_Message_Reaction = {
  count: number
  message_reaction_type_id: number
}