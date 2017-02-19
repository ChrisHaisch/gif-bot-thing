var flags = "00000";
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
        app.handle_input();
        return e.preventDefault();
      });
    },
    handle_input() {
    
        var msg;
        msg = $(".text").val().trim();
        if (msg) {
       $(".text").val("");
        $(".messages").append("<div class='message'><div class='you'>" + msg + "</div></div>");
        this.check_input(msg);
      
        
      }
    },
      
    check_input: function(msg) {
        
        switch (flags) {
            case "00000":
                //generic/ checking response
                var reg_pattern;
                reg_pattern = /hello/i;
                if (reg_pattern.test(msg)) {
                    this.bot_post("Hi! You seem fun!");
                }
                reg_pattern = /game[s]?/i;
                if (reg_pattern.test(msg)) {
                    this.bot_post("You wanna play a game?");
                    this.bot_post("I know tic tac toe!");
                    flags = "10000";
                }
                break;
                
            case "10000":
                //playing tic tac toe
                this.bot_post("We're playing tic tac toe.");
                break;
        }

      
        
        reg_pattern = /tic\s*tac\s*toe/i;
        if (reg_pattern.test(msg)) {
            return true;
        }
        
    },

    game_menu: function() {
        var text = $(".text").val().trim();
        this.bot_post(text);
          $(".text").val("");
        $(".messages").append("<div class='message'><div class='you'>" + text + "</div></div>");
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