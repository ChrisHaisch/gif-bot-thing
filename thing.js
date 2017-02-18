$(document).ready ->
  app.init()
  
app =
  api_key: "dc6zaTOxFJmzC" # Public API key from giphy.com
  
  init: ->
    @bind_events()
    
  bind_events: ->
    $(document).on "submit", "#chat", (e) ->
      app.send_message()
      e.preventDefault()
      
  send_message: ->
    msg = $(".text").val().trim()
    if msg
      $(".text").val("")
      $(".messages").append("<div class='message'><div class='you'>"+msg+"</div></div>");
      @check(msg)
    
  check: (msg) ->
    if msg.substring(0, 6) is "gif me"
      keyword = msg.substring(7)
      keyword = keyword.replace(/[ ]/g, "+")
      @get_gif keyword
    else
      @bot_post "Wrong syntax ''gif me keyword''."
      
  bot_post: (msg) ->
    $(".messages").append("<div class='message'><div class='bot'>"+msg+"</div></div>");
    
  get_gif: (keyword) ->
    $.get "http://api.giphy.com/v1/gifs/search?q="+keyword+"&api_key="+@api_key, (data) ->
      if data.data.length is 0
        app.bot_post "Sorry I can't find any gif for that :("
      else
        index = Math.floor(Math.random() * ((data.data.length - 1) - 0 + 1) + 0)
        app.bot_post "<img src='"+data.data[index].images.fixed_height.url+"' alt='' />"
    