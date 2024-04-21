import random

user_wins = 0
computer_wins = 0
match_draw = 0


options = ["rock", "paper", "scissors"]

while True:
    print("Type Rock / Paper / Scissors , Q to quit , R for random response : ")
    user_input = input().lower()
    if user_input == "q":
        break

    computer_pick = random.choice(options)

    if user_input == "r":
        user_input = random.choice(options)
    
    if user_input not in options:
        break

    if user_input == "rock" and computer_pick == "scissors":
        print("You won!")
        user_wins += 1
        winrate = (user_wins / (user_wins + computer_wins)) * 100 if (user_wins + computer_wins) != 0 else 0
        print("Wins: ", user_wins, " / Loss: ", computer_wins, " Draws: ", match_draw, " Winrate: ", winrate, " %")
        break

    elif user_input == "paper" and computer_pick == "rock":
        print("You won!")
        user_wins += 1
        winrate = (user_wins / (user_wins + computer_wins)) * 100 if (user_wins + computer_wins) != 0 else 0
        print("Wins: ", user_wins, " / Loss: ", computer_wins, " Draws: ", match_draw, " Winrate: ", winrate, " %")
        break

    elif user_input == "scissors" and computer_pick == "paper":
        print("You won!")
        user_wins += 1
        winrate = (user_wins / (user_wins + computer_wins)) * 100 if (user_wins + computer_wins) != 0 else 0
        print("Wins: ", user_wins, " / Loss: ", computer_wins, " Draws: ", match_draw, " Winrate: ", winrate, " %")
        break

    elif user_input == computer_pick:
        print("You draw!")
        match_draw += 1
        winrate = (user_wins / (user_wins + computer_wins)) * 100 if (user_wins + computer_wins) != 0 else 0
        print("Wins: ", user_wins, " / Loss: ", computer_wins, " Draws: ", match_draw, " Winrate: ", winrate, " %")    
        break

    else:
        print("You lose.")
        computer_wins += 1
        winrate = (user_wins / (user_wins + computer_wins)) * 100 if (user_wins + computer_wins) != 0 else 0
        print("Wins: ", user_wins, " / Loss: ", computer_wins, " Draws: ", match_draw, " Winrate: ", winrate, " %")

    break


print("You won", user_wins, "times.")
print("The computer won", computer_wins, "times.")
print("You both drew ", match_draw, " times.")
print("Final winrate: ", winrate, " %\n")
print("See you next time")


