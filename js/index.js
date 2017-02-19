// these flags let us have the same operation as inner loops and nesting that we couldn't figure out with geting user input again.  
// Each flag is specific to a section run:
// 10000 = Tic Tac Toe
// 01000 = Yelp Loop
// 00100 = 
// 00010 =
// 00001 =

var flags = "00000";
// board init at game start, 0 is empty, 1 is X, 2 is O
var board;

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
                this.generic_handler(msg);
                break;
                
            case "10000":
                //playing tic tac toe
                 this.tic_tac_toe(msg);
                break;
                
            case "01000":
                this.food_handler(msg);
                break;
        }

      
        
        reg_pattern = /tic\s*tac\s*toe/i;
        if (reg_pattern.test(msg)) {
            return true;
        }
        

    }, 
      
    tic_tac_toe: function(msg) {
        if (!this.quit_check(msg)) {
            var space =  "⬜️";
            var o_shape = "⭕️";
            var x_shape = "❌";
        // Error check user input and continue
            var digits = /^[0-8]$/;
            if (!digits.test(msg)) {
                this.bot_post("Not a value I can use. Try again.");
            } else {
                msg = msg.trim();
                board[msg] = x_shape;
                this.print_board();
                this.check_win();
                this.ai_move();
            }
        }
       
    },
    check_win: function(msg) {
        
    },
    food_handler: function() {
         var reg_patern = "exit";
        if(reg_patern == msg){
             this.bot_post("fuck you");
             flags = "00000";
        }

    },
    quit_check: function(msg) {
        var regA = /exit/i;
        var regB = /quit/i;
        if(regA.test(msg) || regB.test(msg)){
             this.bot_post("Ok, back to our conversation.");
             flags = "00000";
            return true;
        }
        return false;
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
      
    // Function to deal with large number of generic phrases and easter eggs
      // There is probably a better way to do the regex system but I'm new to all of this soo....Probably should have implemented as nested conditionals that check portions of strings for common starting phrases and then handle from there.
    generic_handler: function(msg) {
        //TODO: Do siri easter egg text cuz iphone, also puns, gifs, and dad jokes
        var reg_pattern;
        // Angry/ Cussing / Harassing Handler
//TODO: finish regex anger string
        reg_pattern = /fuck|^shit|^ass|^bitch|whore|^slut/i;
        if (reg_pattern.test(msg)) {
            return this.bot_post("");
        }
        reg_pattern = /(hello|^hi[^a-z]*|hey)/i;
        if (reg_pattern.test(msg)) {
            this.bot_post("Hi! I'm fun, I know games and puns:)" );
        }
        // Let the hello fall through to possible other options
        reg_pattern = /how are you/i;
        if (reg_pattern.test(msg)) {
            return this.bot_post("");
        }
        reg_pattern = /\b(your name)|\bold|age/;
        if (reg_pattern.test(msg)) {
            return this.bot_post("Awww, well, at lea");
        }
    //TODO: tell me a story/ riddle/ pun etc
        reg_pattern = /tell me a/i;
        if (reg_pattern.test(msg)) {
            // if pun, story, joke
        }
        reg_pattern = /game[s]?/i;
        if (reg_pattern.test(msg)) {
            this.bot_post("How about tic tac toe!");
            flags = "10000";
            board = ["⬜️", "⬜️", "⬜️",
                     "⬜️", "⬜️", "⬜️", 
                     "⬜️", "⬜️", "⬜️"];
            this.print_board();
           return this.bot_post("Your move! Pick a slot using the board number. 0,1,2-3,4,5-6,7,8 starting from top left");
        }
        
        reg_pattern = /(love|like)\s*me/i;
        if(reg_pattern.test(msg)) {
           return this.bot_post("Look...a puppy!");
        }
        
        reg_pattern = /(love|like)\s*you/i;
        if (reg_pattern.test(msg)) {
            return this.bot_post("");
        }
        
        reg_pattern = /^(How do you feel)/i;
        if (reg_pattern.test(msg)) {
             return this.bot_post("I think, therefore I am.  But let's not put Descartes before the horse.");
        }
        
        reg_pattern = /supercalifragilisticexpialidocious/i;
            if (reg_pattern.test(msg)) {
            return this.bot_post("The sound of that is something quite atrocious");
        }
        
        reg_pattern = /i look/i;
            if (reg_pattern.test(msg)) {
            return this.bot_post("Judging by your typing, you must be fairly attractive");
        }
    },
    print_board: function() {
        
        this.bot_post(board[0] + board[1] + board[2]);
        this.bot_post(board[3] + board[4] + board[5]);
        this.bot_post(board[6] + board[7] + board[8]);
        
    },
    ai_move: function() {
        this.bot_post("My turn!");
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
