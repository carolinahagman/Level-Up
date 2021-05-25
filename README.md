<img src="https://media0.giphy.com/media/l4EoV8U6ud7TZoyNG/giphy.gif?cid=ecf05e47ye3hz65jnsan2zgo723qpab24cqir1hk1djjsqnk&rid=giphy.gif&ct=g" width="100%">

# Towerfall

A multiplayer game inspired by Towerfall built with [Phaser3](https://phaser.io/).
You can play it [here](https://towerfall.netlify.app/).

# Installation

Clone the repository to your computer

```
$ git clone https://github.com/carolinahagman/Level-Up.git
```

`cd` into the project folder.

type `npm install` followed by `npm start`

in your preferred browser type `localhost:8080`

Find a friend and play!

# Changelog

- [#1 - Add start of project.](https://github.com/carolinahagman/Level-Up/pull/1)
- [#2 - Add game scene and background](https://github.com/carolinahagman/Level-Up/pull/2)
- [#3 - Plattforms and tiles](https://github.com/carolinahagman/Level-Up/pull/3)
- [#4 - Tiles to scene and sprites](https://github.com/carolinahagman/Level-Up/pull/4)
- [#5 - Movement and basic shooting](https://github.com/carolinahagman/Level-Up/pull/5)
- [#6 - Shooting refinement](https://github.com/carolinahagman/Level-Up/pull/6)
- [#7 - Display of arrows](https://github.com/carolinahagman/Level-Up/pull/7)
- [#8 - Add a second player](https://github.com/carolinahagman/Level-Up/pull/8)
- [#9 - Socket connection established](https://github.com/carolinahagman/Level-Up/pull/9)
- [#10 - Local multiplayer added](https://github.com/carolinahagman/Level-Up/pull/10)
- [#11 - Game over scene and game mechanics finished](https://github.com/carolinahagman/Level-Up/pull/11)
- [#12 - Add changelogs](https://github.com/carolinahagman/Level-Up/pull/12)
- [#13 - Add controls to start scene](https://github.com/carolinahagman/Level-Up/pull/13)
- [#14 - Fix small mistakes](https://github.com/carolinahagman/Level-Up/pull/14)

# Code Review

1. Some instructions on the goal of the game would be helpful for those who dont know Towerfall from before. E.g, purpose of the crate.
2. index:4 and StartScene:90: don't forget to delete outcommented/ not used code
3. Player gets stuck between the crates and the platform - is it a feature/ is it a bug? :beetle:
4. Players can get killed by their own arrows :sob:
5. When the two player meets, one of them dies even without arrows being fired
6. Love that you can come out on the other side of the field -sneak-attack!
7. GameScene:336: cool feature that you can shoot at different directions
8. GameScene:443: love that you can pick up your arrows!
9. Fun, that it is multiplayer
10. The code is very well organised and easy to understand

Really good job with the game! :tada:

# Testers

Tested by the following people:

1. Linn Josefsson
2. Sandra Danielsson
3. Réka Madarász
4. John Doe

Tested by the following muggles (non-coders):

1. Jane Doe
2. John Doe
3. Jane Doe
4. John Doe
