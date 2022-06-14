# All GraphQL Commands

```
query getAllUsers{
  users{
    id
    username
    email
  }
}
query getAnUser{
  user(id:"3"){
    id
    username
    email
  }
}


query getAllEvents{
  events{
    id
    title
    desc
    from
    to
    location_id
    user_id
  }
}

query getAnEvent{
  event(id:"1"){
    id
    title
    desc
    from
    to
    location_id
    user_id
  }
}


query getAllLocations{
  locations{
    id
    name
    desc
    lat
    lng
  }
}

query getALocation{
  location(id:"1"){
    id
    name
    desc
    lat
    lng
  }
}

query getAllParticipants{
  participants{
    id
    user_id
    event_id
  }
}
query getAParticipant{
  participant(id:"3"){
    id
    user_id
    event_id
  }
}

query getAll{
  events{
    id
    title
    user{
      id
      username
    }
    participants{
      id
      user_id
    }
    location{
      id
      name
    }
  }
}

```
