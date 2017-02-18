(function () {
  var app;

  $(document).ready(function() {
    return app.init();
  });

  app = {
    api_key: "dc6zaTOxFJmzC",
    init: function() {
      return this.bind_events();
    },
    bind_events: function() {
      return $(document).on("submit", "#chat", function(e) {
        app.send_message();
        return e.preventDefault();
      });
    },
         
    check_input: function(msg) {
        var reg_pattern;
        reg_pattern = /hello/i;
        if (reg_pattern.test(msg)) {
            this.bot_post("Hi! You seem fun!");
        }
        reg_pattern = /game[s]?/i;
        if (reg_pattern.test(msg)) {
            this.bot_post("You wanna play a game?");
            this.bot_post("I know tic tac toe!");
            this.game_menu();
        }
        
        reg_pattern = /tic\s*tac\s*toe/i;
        if (reg_pattern.test(msg)) {
            return this.bot_post("We're gonna play tic tac toe.");
        }
        
    },
    
    game_menu: function() {
     
        return this.bot_post("in the game menu");
    },
         
    send_message: function() {
      var msg;
      msg = $(".text").val().trim();
      if (msg) {
        $(".text").val("");
        $(".messages").append("<div class='message'><div class='you'>" + msg + "</div></div>");
        return this.check_input(msg);
        
      }
    },
    bot_post: function(msg) {
      return $(".messages").append("<div class='message'><div class='bot'>" + msg + "</div></div>");
    },
    get_gif: function(keyword) {
      return $.get("http://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=" + this.api_key, function(data) {
        var index;
        if (data.data.length === 0) {
          return app.bot_post("Sorry I can't find any gif for that :(");
        } else {
          index = Math.floor(Math.random() * ((data.data.length - 1) - 0 + 1) + 0);
          return app.bot_post("<img src='" + data.data[index].images.fixed_height.url + "' alt='' />");
        }
      });
    }
  };

}).call(this);