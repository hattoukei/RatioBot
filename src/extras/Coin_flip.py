import random
import time
import sys

options = ["Heads", "Tails"]
randomtext = ["Coin is being flipped", "Bust, or maybe I'll TAKE IT ALL", "Coin is being flipped", "Coin is being flipped", "This doesn't look good for you"]

def delayed_text(text, delay=0.05):
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)

def flip_loading_message(repeats=3, delay=0.5):
    for _ in range(repeats):
        message = random.choice(randomtext)
        sys.stdout.write('\r' + message)
        sys.stdout.flush()
        for _ in range(3):
            time.sleep(delay)
            if message == "Bust, or maybe I'll TAKE IT ALL":
                sys.stdout.write('!')
            else:
                sys.stdout.write('.')
            sys.stdout.flush()
        time.sleep(delay)
        sys.stdout.write('\r' + '   ' * 20)  # Clear the line
        sys.stdout.flush()

def single_flip():
    flip_loading_message()
    result = random.choice(options)
    delayed_text(result, .75) 
    delayed_text("!!!", .2)
    print()

def multiple_flip():
    best_of = int(input("Best of what? "))
    heads_count = 0
    tails_count = 0
    flip_loading_message(5, .35)

    for _ in range(best_of):
        flip = 'Heads' if random.randint(0,1) == 0 else 'Tails'
        if flip == 'Heads':
            heads_count += 1
        else:
            tails_count += 1
    if heads_count > tails_count:
        delayed_text(f"There are {heads_count} heads out of {best_of} flips!")
    elif heads_count < tails_count:
        delayed_text(f"There are {tails_count} tails out of {best_of} flips!")
    else:
        delayed_text(f"There is a tie. {heads_count} heads, {tails_count} tails.")
    print()
    

while True:
    user_input = input("Would you like a single flip or multiple flips? ").lower()
    if user_input == "single":
        single_flip()
        continue
    elif user_input == "multiple":
        multiple_flip()
        continue
    elif user_input == "no" or user_input == "nope" or user_input == "nay" or user_input == "quit":
        break
    else:
        print("I gave you two options, input correctly.")
        continue

delayed_text("See you next time.")

