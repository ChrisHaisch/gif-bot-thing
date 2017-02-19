// these flags let us have the same operation as inner loops and nesting that we couldn't figure out with geting user input again.  
// Each flag is specific to a section run:
// 10000 = Tic Tac Toe
// 01000 = Yelp Loop
// 00100 = 
// 00010 =
// 00001 =

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
    handle_input: function() {
    
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
                 this.tic_tac_toe();
                break;
                
            case "01000":
                this.food_handler();
                break;
        }

      
        
        reg_pattern = /tic\s*tac\s*toe/i;
        if (reg_pattern.test(msg)) {
            return true;
        }
        
    },
// quit handler, returns boolean
      // Todo Not working
    quit_check: function(msg) {
        var a = /exit/i;
        var b = /quit/i;
        if (a.test(msg) || b.test(msg)) {
            return true;
        }
        return false;
    },
//tic tac toe handler
    tic_tac_toe: function(msg) {
        this.bot_post("We're playing tic tac toe.");
    
    },
// Yelp handler
    food_handler: function(msg) {
        this.bot_post("in food handler");
    },
// gets message and clears the form
    send_message: function() {
      var msg;
      msg = $(".text").val().trim();
      if (msg) {
        $(".text").val("");
        $(".messages").append("<div class='message'><div class='you'>" + msg + "</div></div>");
        return this.check_input(msg);
        
      }
    },
// posts from the bot
    bot_post: function(msg) {
      return $(".messages").append("<div class='message'><div class='bot'>" + msg + "</div></div>");
    },
// TODO gets smae few gifs no matter search terms
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