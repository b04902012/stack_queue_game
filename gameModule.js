// random int in range [min, max] (inclusive)
function RandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Simple deep copy function, should be good enough
// https://stackoverflow.com/a/34283281
function DeepCopy(x) {
  return JSON.parse(JSON.stringify(x));
}

function User() {
  var queue_ = Array();
  var stack_ = Array();
  var round_finish_ = -1;

  var RoundCheck = (round) => {
    if (round === round_finish_)
      return false;
    if (round === round_finish_ + 1)
      return true;
    throw new Error("Unexpected round id");
  }

  this.PushQueue = (round, x) => {
    if (!RoundCheck(round))
      return false;
    queue_.push(x);
    round_finish_++;
    return true;
  }
  this.PopQueue = (round) => {
    if (!RoundCheck(round))
      return false;
    if (queue_.length === 0)
      return false;
    queue_.shift();
    round_finish_++;
    return true;
  }
  this.PushStack = (round, x) => {
    console.log(x);
    if (!RoundCheck(round))
      return false;
    stack_.push(x);
    round_finish_++;
    return true;
  }
  this.PopStack = (round) => {
    if (!RoundCheck(round))
      return false;
    if (stack_.length === 0)
      return false;
    stack_.pop();
    round_finish_++;
    return true;
  }
  this.ExportState = (round) => {
    RoundCheck(round);
    let state = {s: stack_, q: queue_, d: round === round_finish_};
    //return JSON.stringify(state);
    return DeepCopy(state);
  }
}

function Game(number_user, operation_sequance, number_sequance, broad_cast, max_value) {
  if (operation_sequance.length !== number_sequance.length)
    throw new Error("Length for operation and number not match");

  var user_list_ = Array();
  for (let i = 0; i < number_user; i++)
    user_list_.push(new User);

  var current_round_ = -1;
  var finished_user_ = number_user;

  var cached_user_data_ = Array(number_user);

  var GenerateBroadcastDataString = () => {
    var data = {};
    data.p = operation_sequance;
    data.n = number_sequance;
    data.u = cached_user_data_;
    return JSON.stringify(data);
  }
  var SetNewRoundRandomConfigure = () => {
    if (operation_sequance[current_round_] === "?") {
      if (RandInt(0, 1) === 0)
        operation_sequance[current_round_] = 'i';
      else
        operation_sequance[current_round_] = 'o';
    }
    if (operation_sequance[current_round_] === "i"
          && number_sequance[current_round_] <= 0) {
      number_sequance[current_round_] = RandInt(1, max_value);
    }
  }
  var CheckAndStartNewRound = () => {
    if (finished_user_ !== number_user)
      return;
    current_round_++;
    finished_user_ = 0;
    if (current_round_ < operation_sequance.length)
      SetNewRoundRandomConfigure()
    for (let i = 0; i < number_user; i++)
      cached_user_data_[i] = user_list_[i].ExportState(current_round_);
    broad_cast(GenerateBroadcastDataString());
  }

  this.DoMove = (user_id, container, round_id) => {
    console.log(user_id, container, round_id);
    // Assume user_id is valid
    if (current_round_ === operation_sequance.length)
      return;
    if (round_id !== current_round_)
      return;

    var success = false;
    if (container === "q") {
      if (operation_sequance[current_round_] === 'i')
        success = user_list_[user_id].PushQueue(current_round_, number_sequance[current_round_]);
      else if (operation_sequance[current_round_] === 'o')
        success = user_list_[user_id].PopQueue(current_round_);
    }
    else if (container === "s") {
      if (operation_sequance[current_round_] === 'i')
        success = user_list_[user_id].PushStack(current_round_, number_sequance[current_round_]);
      else if (operation_sequance[current_round_] === 'o')
        success = user_list_[user_id].PopStack(current_round_);
    }

    console.log(success);
    if (success) {
      finished_user_++;
      cached_user_data_[user_id].d = true;
      broad_cast(GenerateBroadcastDataString());
      if (finished_user_ == number_user)
        CheckAndStartNewRound();
    }
  }

  CheckAndStartNewRound();
}

module.exports = {
    Game
}
/*
test = new Game(3, "iio", [-1, -1, -1], (s) => {console.log(s)}, 10)
test.DoMove(1, "s", 0);
test.DoMove(2, "q", 0);
test.DoMove(2, "s", 0);
test.DoMove(0, "s", 0);
test.DoMove(1, "s", 1);
test.DoMove(2, "q", 1);
test.DoMove(2, "s", 1);
test.DoMove(0, "s", 1);
test.DoMove(1, "s", 2);
test.DoMove(2, "q", 1);
test.DoMove(2, "s", 2);
test.DoMove(0, "s", 2);
test.DoMove(2, "q", 2);

test.DoMove(2, "q", 3);
*/
