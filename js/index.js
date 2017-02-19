// these flags let us have the same operation as inner loops and nesting that we couldn't figure out with geting user input again.  
// Each flag is specific to a section run:
// 10000 = Tic Tac Toe
// 01000 = Yelp Loop
// 00100 = 
// 00010 =
// 00001 =
// GLOBAL VARS ARE OFTEN BAD PRACTICE I DONT CARE AT 5AM 
var flags = "00000";
// board init at game start, 0 is empty, 1 is X, 2 is O
var board;
var pos_left;
var ai_pos;

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
                //generic checking response, not in a loop
                this.generic_handler(msg);
                break;
                
            case "10000":
                // playing tic tac toe
                 this.tic_tac_toe(msg);
                break;
                
            case "01000":
                // dealing with food loop
                this.food_handler(msg);
                break;
        }
    }, 
    tic_tac_toe: function (msg) {
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
             var index = pos_left.indexOf(msg);
                if (index > -1) {
                    pos_left.splice(index, 1);
                }
                this.print_board();
                this.check_win();
                this.ai_move();
                this.print_board();
                this.check_win();
            }
        }
       
    },
// really gross check win function, didn't want to waste time here so ctrl+v was friend
// handles both player and AI win, prints message and quits to menu
      check_win: function() {
            var space =  "⬜️";
            var o_shape = "⭕️";
            var x_shape = "❌";
        // first three check horizontal
        if (board[0] == x_shape && board[1] == x_shape && board[2] == x_shape) {
            this.bot_post("You won, holy cow you're good!");
            flags = "00000";
        }
        if (board[3] == x_shape && board[4] == x_shape && board[5] == x_shape) {
            this.bot_post("You won, holy cow you're good!");
            flags = "00000";
        }
        if (board[6] == x_shape && board[7] == x_shape && board[8] == x_shape) {
            this.bot_post("You won, holy cow you're good!");
            flags = "00000";
        }
          if (board[0] == o_shape && board[1] == o_shape && board[2] == o_shape) {
            this.bot_post("Sorry I beat you, bettter luck next time!");
            flags = "00000";
        }
        if (board[3] == o_shape && board[4] == o_shape && board[5] == o_shape) {
            this.bot_post("Sorry I beat you, bettter luck next time!");
            flags = "00000";
        }
        if (board[6] ==o_shape && board[7] == o_shape && board[8] == o_shape) {
            this.bot_post("Sorry I beat you, bettter luck next time!");
            flags = "00000";
        }
        // these three check vertical
         if (board[0] == x_shape && board[3] == x_shape && board[6] == x_shape) {
            this.bot_post("You won, holy cow you're good!");
            flags = "00000";
        }
        if (board[1] == x_shape && board[4] == x_shape && board[7] == x_shape) {
            this.bot_post("You won, holy cow you're good!");
            flags = "00000";
        }
        if (board[2] == x_shape && board[5] == x_shape && board[8] == x_shape) {
            this.bot_post("You won, holy cow you're good!");
            flags = "00000";
        }
        if (board[0] == o_shape && board[3] == o_shape && board[6] == o_shape) {
            this.bot_post("Sorry I beat you, bettter luck next time!");
            flags = "00000";
        }
        if (board[1] == o_shape && board[4] == o_shape && board[7] == o_shape) {
            this.bot_post("Sorry I beat you, bettter luck next time!");
            flags = "00000";
        }
        if (board[2] == o_shape && board[5] == o_shape && board[8] == o_shape) {
            this.bot_post("Sorry I beat you, bettter luck next time!");
            flags = "00000";
        }
        // last two check horizontal
        if (board[0] == x_shape && board[4] == x_shape && board[8] == x_shape) {
            this.bot_post("You won, holy cow you're good!");
            flags = "00000";
        }
        if (board[2] == x_shape && board[4] == x_shape && board[6] == x_shape) {
            this.bot_post("You won, holy cow you're good!");
            flags = "00000";
        }
        if (board[0] == o_shape && board[4] == o_shape && board[8] == o_shape) {
            this.bot_post("Sorry I beat you, bettter luck next time!");
            flags = "00000";
        }
        if (board[2] == o_shape && board[4] == o_shape && board[6] == o_shape) {
            this.bot_post("Sorry I beat you, bettter luck next time!");
            flags = "00000";
        }
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
        reg_pattern = /\bfuck|^shit|^ass|^bitch|whore|^slut\b/i;
        if (reg_pattern.test(msg)) {
            return this.bot_post("");
        }
        reg_pattern = /\b(hello|^hi|hey)\b/i;
        if (reg_pattern.test(msg)) {
            this.bot_post("Hi! I'm fun, I know games and puns:)" );
        }
        // Let the hello fall through to possible other options
        reg_pattern = /how are you/i;
        if (reg_pattern.test(msg)) {
            return this.bot_post("");
        }
        reg_pattern = /\b(your name)|\bold|age\b/;
        if (reg_pattern.test(msg)) {
            // TODO return all basic bot info for any question of age/name/etc
            return this.bot_post("");
        }
    //TODO: tell me a story/ riddle/ pun etc
        reg_pattern = /tell me a/i;
        if (reg_pattern.test(msg)) {
            // if pun, story, joke
        }
     
        reg_pattern = /(\bplay|game[s]?\b)|(tic\s*tac\s*toe)/i;
        if (reg_pattern.test(msg)) {
            this.bot_post("How about tic tac toe!");
            flags = "10000";
            board = ["⬜️", "⬜️", "⬜️",
                     "⬜️", "⬜️", "⬜️", 
                     "⬜️", "⬜️", "⬜️"];
            pos_left = [0,1,2,3,4,5,6,7,8];
            ai_pos = [];
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
        // pick random move from pos_left
        var size = pos_left.length;
        var index = Math.floor(Math.random() * size);
        board[index] = "⭕️";
        var remove = pos_left.indexOf(index);
        if (remove > -1) {
            pos_left.splice(remove, 1);
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
