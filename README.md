# ratscrew
A version of Egyptian Ratscrew that runs in the terminal.

## How to play
All players will start with the same amount of cards, and the object of the game is to get all the cards for yourself. Players take turns laying down cards from their deck to the pile in the middle, face up. When a face card or ace is played, everything stops and the next player has a certain amount of chances to lay down another face card. If the player doesn't, the first player gets all the cards on the pile. If the second player *does* lay down another face card, it all starts over for the next player. How many chances you have depends on the face card:

* Jack - 1 chance
* Queen - 2 chances
* King - 3 chances
* Ace - 4 chances

Jacks, then, are very powerful cards to have because the player only has one shot at another face card, otherwise you get everyting on the pile.

At any time, any player can slap the deck to get all the cards, and the whole process starts over with them going first. In order to slap, one of the following must be true:
* The top card is the same as the card below (pair)
* The top card is the same as two cards below (sandwich)
* The top card is a Joker

If you failed to put down a face card in a "face off," you could still slap the cards (if it's valid) and steal all the cards from the victor.

If your slap is invalid, a card from the top of your deck will be placed at the bottom of the pile.

If you are playing with more than two players, players that have ran out of cards have the option of slapping back into the game. They will gain all of the cards in the pile, and carry on playing. Playing this way can make games last a very long time!

## Getting started
This requires you have [Node.js](http://nodejs.org) installed

First, clone the repository, then run 
```
node ratscrew.js
```
### Controls
Select player amount with arrow keys, then press enter.

You can quit anytime by pressing escape.

Each player has a flip key that flips a new card when it's their turn, as well as a slap key, which... slaps.
* Player 1 - Flip: z, Slap : q
* Player 2 - Flip: c, Slap : r
* Player 3 - Flip: b, Slap : y
* Player 4 - Flip: m, Slap : p

(I have yet to make a way to change this through the ui, but for now you can find it on line 10 in ratscrew.js)

*I hope you enjoy it!*
