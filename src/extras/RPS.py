import random

def RPS(user_input, score=[0, 0, 0]):
    user_wins = 0
    computer_wins = 0
    match_draw = 0

    options = ["rock", "paper", "scissors"]

    computer_pick = random.choice(options)

    if user_input == 'r':
        user_input = random.choice(options)
    
    if user_input not in options:
        print("Type Rock / Paper / Scissors, R for random response : ")
        return
    
    print(f"{user_input} vs. {computer_pick}")

    if user_input == options[0] and computer_pick == options[2]:
        print("You won!")
        user_wins += 1
        score[0] += 1

    elif user_input == options[1] and computer_pick == options[0]:
        print("You won!")
        user_wins += 1
        score[0] += 1

    elif user_input == options[2] and computer_pick == options[1]:
        print("You won!")
        user_wins += 1
        score[0] += 1
        
    elif user_input == computer_pick:
        print("You draw!")
        match_draw += 1  
        score[2] += 1

    else:
        print("You lose.")
        computer_wins += 1
        score[1] += 1
    
    winrate = (user_wins / (user_wins + computer_wins)) * 100 if (user_wins + computer_wins) != 0 else 0
    print(f"Wins: {user_wins} | Losses: {computer_wins} | Draws: {match_draw} | Winrate: {winrate}%\n"\
          f"You won {user_wins} times. The computer won {computer_wins} times. You both drew {match_draw} times.\n"\
          f"Final winrate: {winrate}%")
    return score

def main():
    choice = input().lower()
    RPS(choice)
    
if __name__ == "__main__":
    main()

