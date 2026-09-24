// Reading passages, all written for this app. Each has three questions of the
// kinds KS2 reading papers ask: finding information, working out what is
// meant (inference), word meaning, and (later) the writer's choices.
// The first option of each question is the right one.
// Difficulty: 1-2 Year 3, 3-4 Year 4, 5 Year 5, 6 Year 6.

export const PASSAGES = [
  // ---------------- level 1 ----------------
  {
    id: 'night-fox', d: 1, title: 'The Night Fox',
    text: 'The fox crept through the frosty garden. Every few steps it stopped, ears twitching, listening for the farmer’s dog.\n\nThe kitchen light was off. The house was asleep. The fox sniffed the air, found the bin by the back door and knocked off the lid with its nose. Clang! A light flicked on upstairs, and the fox was gone.',
    word: { word: 'crept', meaning: 'moved slowly and quietly' },
    qs: [
      { q: 'Why did the fox keep stopping?', o: ['It was listening for the dog', 'It was tired from running', 'The garden was too cold', 'It had lost its way home'], h: 'Look at the end of the first paragraph.' },
      { q: 'What woke someone up in the house?', o: ['The clang of the bin lid', 'The dog barking', 'The fox howling', 'The kitchen light'], h: 'What happened just before the light flicked on?' },
      { q: 'What does <i>crept</i> mean in this story?', o: ['moved slowly and quietly', 'ran very fast', 'jumped high', 'rolled over'], h: 'The fox did not want to be heard.' },
    ],
  },
  {
    id: 'comet-flight', d: 1, title: 'Comet’s First Flight',
    text: 'Comet was the smallest unicorn on Star Hill. Every night the older unicorns galloped up into the sky, leaving trails of silver light. Comet watched from the grass.\n\n“One day,” said Mum, “you will fly too.”\n\nOne night Comet took a deep breath, ran as fast as she could and jumped. Her hooves lifted off the ground. She was flying! Behind her, a tiny trail of silver sparkled in the dark.',
    word: { word: 'galloped', meaning: 'ran fast, like a horse' },
    qs: [
      { q: 'Where did the unicorns live?', o: ['Star Hill', 'Moon Valley', 'Silver Lake', 'Cloud Castle'], h: 'Look at the first sentence.' },
      { q: 'How do you think Comet felt at the end?', o: ['Proud and excited', 'Sad and lonely', 'Bored', 'Angry with Mum'], h: 'She finally did something she had wanted to do.' },
      { q: 'What did the unicorns leave behind them in the sky?', o: ['Trails of silver light', 'Gold stars', 'Clouds of smoke', 'Rainbows'], h: 'Find the word "trails".' },
    ],
  },
  {
    id: 'big-match', d: 1, title: 'The Big Match',
    text: 'It was the last minute of the match and the score was 1–1. Isla’s legs felt like jelly.\n\nThen the ball rolled to her feet. She looked up. The goalkeeper was standing too far to the left. Isla took a breath and kicked the ball hard into the right corner.\n\nThe net shook. The whistle blew. Her team ran and lifted her into the air, cheering her name.',
    word: { word: 'cheering', meaning: 'shouting happily to show support' },
    qs: [
      { q: 'What was the score before Isla kicked the ball?', o: ['1–1', '0–0', '2–1', '1–0'], h: 'Look at the first sentence.' },
      { q: 'Why did Isla kick the ball into the right corner?', o: ['The goalkeeper was too far to the left', 'Her coach told her to', 'The ball was already going that way', 'She always kicks to the right'], h: 'What did she notice when she looked up?' },
      { q: '<i>Her legs felt like jelly</i> means she felt…', o: ['nervous', 'hungry', 'sleepy', 'cold'], h: 'It was the last minute of a big match.' },
    ],
  },
  {
    id: 'hedgehog', d: 1, title: 'Hedgehogs in Winter',
    text: 'Hedgehogs are small animals covered in sharp spines. When they are scared, they roll into a tight, prickly ball.\n\nIn autumn, hedgehogs eat as much as they can: beetles, worms and slugs. Then, when the weather gets cold, they build a nest of leaves and go into a long, deep sleep called hibernation. They usually wake up again in spring.',
    word: { word: 'hibernation', meaning: 'a long, deep sleep through the winter' },
    qs: [
      { q: 'What does a hedgehog do when it is scared?', o: ['Rolls into a ball', 'Runs up a tree', 'Hides underwater', 'Makes a loud noise'], h: 'Look at the second sentence.' },
      { q: 'Why do hedgehogs eat so much in autumn?', o: ['To get ready for their long winter sleep', 'Because food is hard to find in summer', 'Because they are growing new spines', 'To share with other hedgehogs'], h: 'What happens next, when it gets cold?' },
      { q: 'What do hedgehogs build their nests from?', o: ['Leaves', 'Mud', 'Twigs and stones', 'Feathers'], h: 'Look at the last paragraph.' },
    ],
  },
  {
    id: 'lost-kitten', d: 1, title: 'Where Is Pepper?',
    text: 'Pepper the kitten was missing. Ben looked under his bed. He looked in the washing basket. He even looked in the fridge, just in case.\n\nThen he heard a tiny sound from the garden. Mew. Mew. Ben ran outside. Under the shed, two green eyes were shining in the dark. Pepper was stuck behind a flowerpot.\n\nBen moved the pot, and Pepper jumped straight into his arms, purring loudly.',
    word: { word: 'purring', meaning: 'the soft rumbling sound a happy cat makes' },
    qs: [
      { q: 'Where did Ben find Pepper?', o: ['Under the shed', 'In the washing basket', 'Under his bed', 'In the fridge'], h: 'Where were the green eyes shining?' },
      { q: 'Why couldn’t Pepper get out?', o: ['She was stuck behind a flowerpot', 'The shed door was locked', 'She was asleep', 'It was too dark'], h: 'Read the end of the second paragraph.' },
      { q: 'How did Pepper feel at the end?', o: ['Happy', 'Frightened', 'Grumpy', 'Hungry'], h: 'What sound was she making?' },
    ],
  },

  // ---------------- level 2 ----------------
  {
    id: 'the-moon', d: 2, title: 'Our Moon',
    text: 'The Moon is Earth’s closest neighbour in space. It travels all the way round the Earth in about four weeks.\n\nThe Moon looks bright at night, but it has no light of its own. It shines because it reflects light from the Sun, like a mirror.\n\nIn 1969, the astronaut Neil Armstrong became the first person to walk on the Moon. His footprints are still there today, because there is no wind or rain on the Moon to blow or wash them away.',
    word: { word: 'reflects', meaning: 'bounces light back, like a mirror' },
    qs: [
      { q: 'How long does the Moon take to travel round the Earth?', o: ['About four weeks', 'One day', 'One year', 'About one week'], h: 'Look at the first paragraph.' },
      { q: 'Why does the Moon shine?', o: ['It reflects light from the Sun', 'It is on fire', 'It has lights on it', 'It is made of ice'], h: 'Read the second paragraph carefully.' },
      { q: 'Why are Neil Armstrong’s footprints still on the Moon?', o: ['There is no wind or rain to remove them', 'Astronauts guard them', 'They were painted on', 'The ground is made of glue'], h: 'Look at the last sentence.' },
    ],
  },
  {
    id: 'penguin-dads', d: 2, title: 'Penguin Dads',
    text: 'Emperor penguins live in Antarctica, one of the coldest places on Earth. After the mother penguin lays her egg, she goes to the sea to find food.\n\nThe father penguin stays behind. He balances the egg on his feet and covers it with a warm flap of skin. For about two months he does not eat at all. To keep warm in the freezing winds, the fathers huddle together in a big group, taking turns to stand on the outside.',
    word: { word: 'huddle', meaning: 'crowd closely together' },
    qs: [
      { q: 'Where does the father keep the egg?', o: ['On his feet', 'In a nest of stones', 'Under the snow', 'In his beak'], h: 'Look at the second paragraph.' },
      { q: 'Why do the fathers take turns on the outside of the group?', o: ['So that nobody gets too cold for too long', 'So they can see the mothers coming', 'Because they are playing a game', 'To keep other animals away'], h: 'The outside of the group is where the wind hits.' },
      { q: 'How long does the father go without eating?', o: ['About two months', 'About two days', 'About two weeks', 'About two years'], h: 'Find "does not eat at all".' },
    ],
  },
  {
    id: 'sandcastle', d: 2, title: 'The Sandcastle Contest',
    text: 'Omar and his sister Zara had one hour to build the best sandcastle on the beach. Omar wanted a tall tower. Zara wanted a wide moat.\n\n“We can’t do both,” Omar grumbled.\n\n“Why not?” said Zara. “You build up, I’ll dig down.”\n\nWhen the judges arrived, the tower was taller than Omar’s knees, and the sea had filled the moat with sparkling water. The judges gave them first prize.',
    word: { word: 'grumbled', meaning: 'complained in a low, cross voice' },
    qs: [
      { q: 'What did Zara want to build?', o: ['A wide moat', 'A tall tower', 'A sand wall', 'A bridge'], h: 'Look at the first paragraph.' },
      { q: 'How did Omar feel when he said "We can’t do both"?', o: ['Fed up', 'Delighted', 'Scared', 'Sleepy'], h: 'Look at the word the writer uses for how he said it.' },
      { q: 'What does this story mostly teach us?', o: ['Working together can be better than arguing', 'Towers are better than moats', 'The sea ruins sandcastles', 'Judges are always fair'], h: 'How did they win?' },
    ],
  },
  {
    id: 'allotment', d: 2, title: 'Grandad’s Allotment',
    text: 'Every Saturday, Ava helps Grandad on his allotment. It is a long, thin patch of land where he grows fruit and vegetables.\n\nIn spring they plant tiny seeds in neat rows. In summer they water the plants every evening, when the sun is not so hot. By autumn there are fat pumpkins, crunchy carrots and more runner beans than they can eat.\n\n“The best part,” says Grandad, “is giving them away to the neighbours.”',
    word: { word: 'allotment', meaning: 'a small piece of land rented for growing food' },
    qs: [
      { q: 'When does Ava help Grandad?', o: ['Every Saturday', 'Every evening', 'Only in spring', 'Every Sunday'], h: 'Look at the first sentence.' },
      { q: 'Why do they water the plants in the evening?', o: ['The sun is not so hot then', 'Ava is at school in the morning', 'The tap only works at night', 'Plants sleep in the day'], h: 'Look at the second paragraph.' },
      { q: 'What does Grandad enjoy most?', o: ['Giving the vegetables away', 'Eating the pumpkins', 'Planting seeds', 'Watering the plants'], h: 'Read what Grandad says at the end.' },
    ],
  },
  {
    id: 'owls', d: 2, title: 'Night Hunters',
    text: 'Many owls are nocturnal. This means they sleep in the day and hunt at night.\n\nOwls have special feathers with soft, fluffy edges, so they can fly almost silently. A mouse will not hear an owl coming until it is too late.\n\nAn owl cannot move its eyes, so it turns its whole head instead. It can turn its head much further round than we can. Its huge eyes help it see in the dark, and its sharp hearing helps it find food hidden under leaves or snow.',
    word: { word: 'nocturnal', meaning: 'awake and active at night' },
    qs: [
      { q: 'Why can owls fly almost silently?', o: ['Their feathers have soft edges', 'They fly very slowly', 'They hold their breath', 'They only fly when it is windy'], h: 'Look at the second paragraph.' },
      { q: 'Why does an owl turn its whole head?', o: ['It cannot move its eyes', 'It is listening for danger', 'Its neck is stiff', 'It is showing off'], h: 'Look at the start of the last paragraph.' },
      { q: 'Which word in the text means <i>without any sound</i>?', o: ['silently', 'nocturnal', 'fluffy', 'hidden'], h: 'It is in the second paragraph.' },
    ],
  },

  // ---------------- level 3 ----------------
  {
    id: 'stolen-trophy', d: 3, title: 'The Case of the Missing Trophy',
    text: 'On Monday morning, the school football trophy had vanished from the hall. Mr Patel was baffled. The doors had been locked all weekend, and the only key was in his pocket.\n\nLeo noticed three things. There were muddy paw prints on the stage. The window at the back was open just a crack. And the caretaker’s dog, Biscuit, had been in a very good mood all morning.\n\nAt lunchtime, Leo followed Biscuit to his basket behind the boiler room. There, under an old blanket, was the shining gold trophy – and three chewed tennis balls.',
    word: { word: 'baffled', meaning: 'completely puzzled' },
    qs: [
      { q: 'Why was Mr Patel baffled?', o: ['The doors were locked and he had the only key', 'He had lost his key', 'The trophy was too heavy to carry', 'Nobody had won the trophy'], h: 'Look at the first paragraph.' },
      { q: 'How did Biscuit most likely get into the hall?', o: ['Through the open window', 'Through the locked door', 'Mr Patel let him in', 'Down the chimney'], h: 'Look at the three things Leo noticed.' },
      { q: 'Which word best describes Leo?', o: ['observant', 'lazy', 'forgetful', 'unkind'], h: 'He noticed small details that others missed.' },
    ],
  },
  {
    id: 'volcanoes', d: 3, title: 'Volcanoes',
    text: 'Deep under the Earth’s surface, it is so hot that rock melts into a thick, glowing liquid called magma. Sometimes the magma pushes its way up through a crack in the ground. When it bursts out, the volcano erupts.\n\nOnce magma reaches the surface, it is called lava. Lava can be hotter than 1,000°C, hot enough to melt metal.\n\nIn the year 79, a volcano called Vesuvius erupted in Italy. Ash buried the nearby town of Pompeii. Hundreds of years later, people dug it up and found streets, houses and even loaves of bread, all preserved under the ash.',
    word: { word: 'erupts', meaning: 'bursts out suddenly' },
    qs: [
      { q: 'What is magma called once it reaches the surface?', o: ['Lava', 'Ash', 'Crust', 'Steam'], h: 'Look at the start of the second paragraph.' },
      { q: 'Why is Pompeii interesting to people today?', o: ['The ash kept the town preserved', 'It is the hottest town in Italy', 'It has the biggest volcano', 'It was never found'], h: 'What did people find when they dug it up?' },
      { q: 'What does <i>preserved</i> mean?', o: ['kept safe from rotting or damage', 'burnt to nothing', 'stolen', 'painted'], h: 'They found bread that was still there after hundreds of years.' },
    ],
  },
  {
    id: 'mary-anning', d: 3, title: 'Mary Anning, Fossil Hunter',
    text: 'Mary Anning was born in 1799 in Lyme Regis, a town on the south coast of England. The cliffs there are full of fossils: the remains of creatures that lived millions of years ago.\n\nWhen Mary was about twelve, she and her brother found the skeleton of a huge sea reptile called an ichthyosaur. Later she discovered many more amazing fossils.\n\nAt the time, women were not allowed to join the important science groups, and other people often took the credit for her work. Today she is remembered as one of the greatest fossil hunters who ever lived.',
    word: { word: 'fossils', meaning: 'the remains of ancient living things, turned to stone' },
    qs: [
      { q: 'Where did Mary Anning live?', o: ['Lyme Regis', 'London', 'Manchester', 'Scotland'], h: 'Look at the first sentence.' },
      { q: 'How old was Mary when she found the ichthyosaur?', o: ['About twelve', 'About six', 'About twenty', 'About forty'], h: 'Look at the second paragraph.' },
      { q: 'Why did Mary not always get the credit for her work?', o: ['Women were not allowed in the science groups', 'She kept her fossils secret', 'She did not find anything important', 'She moved away'], h: 'Look at the last paragraph.' },
    ],
  },
  {
    id: 'whispering-wood', d: 3, title: 'The Whispering Wood',
    text: 'Nobody went into the Whispering Wood after dark. The trees there were said to talk, and their branches reached out like long, bony fingers.\n\nBut Priya’s cat had run in, and Priya was not going to leave him. She switched on her torch and stepped between the trees. The leaves rustled. “Turn back,” they seemed to hiss.\n\nThen, in a clearing, she saw a soft white glow. A unicorn stood there, with Priya’s cat curled up asleep against its side. The unicorn lowered its horn gently, as if to say: he is safe.',
    word: { word: 'clearing', meaning: 'an open space in a wood with no trees' },
    qs: [
      { q: 'Why did Priya go into the wood?', o: ['To find her cat', 'To look for a unicorn', 'For a dare', 'She was lost'], h: 'Look at the start of the second paragraph.' },
      { q: '<i>Branches reached out like long, bony fingers.</i> What does this make the wood seem?', o: ['Creepy', 'Cheerful', 'Tiny', 'Noisy'], h: 'Think about how bony fingers reaching for you would feel.' },
      { q: 'How was the unicorn different from what Priya expected of the wood?', o: ['It was gentle and kind', 'It was fierce and angry', 'It could talk', 'It was very small'], h: 'Everyone said the wood was scary. What did the unicorn do?' },
    ],
  },
  {
    id: 'rock-pools', d: 3, title: 'Life in a Rock Pool',
    text: 'When the tide goes out, it leaves behind pools of seawater among the rocks. These rock pools are full of life, if you know where to look.\n\nSea anemones look like blobs of red jelly when the tide is out. Under water, they open up like flowers and catch tiny creatures with their tentacles. Limpets clamp themselves to the rocks so tightly that the waves cannot knock them off. Crabs hide under stones and seaweed, keeping safe from hungry seagulls.\n\nIf you visit a rock pool, look carefully, and always put stones back the way you found them.',
    word: { word: 'tentacles', meaning: 'long, bendy arms used to feel and grab' },
    qs: [
      { q: 'What do sea anemones look like when the tide is out?', o: ['Blobs of red jelly', 'Flowers', 'Small crabs', 'Seaweed'], h: 'Look at the start of the second paragraph.' },
      { q: 'Why do crabs hide under stones?', o: ['To keep safe from seagulls', 'To stay warm', 'To catch limpets', 'To sleep'], h: 'Read the end of the second paragraph.' },
      { q: 'Why should you put stones back the way you found them?', o: ['So the creatures keep their homes', 'So nobody knows you were there', 'Because stones are valuable', 'So the tide can move them'], h: 'Think about who lives under the stones.' },
    ],
  },

  // ---------------- level 4 ----------------
  {
    id: 'rocket-club', d: 4, title: 'The Rocket Club',
    text: 'Priya’s first rocket rose about a metre, wobbled, and flopped onto the grass like a tired fish. Everyone laughed. Priya’s cheeks burned.\n\nThat night, she sat at the kitchen table with her notebook. The fins were too small, she decided, and the nose was too heavy. She drew a new design, then another, then another.\n\nA week later, the whole Rocket Club gathered on the field. Priya pressed the button. With a whoosh, her rocket shot straight up, higher than the school roof, and a tiny parachute floated it back down. This time, nobody laughed. They clapped.',
    word: { word: 'design', meaning: 'a plan or drawing showing how something will be made' },
    qs: [
      { q: 'What does <i>Priya’s cheeks burned</i> tell us?', o: ['She felt embarrassed', 'She had a fever', 'She was sunburnt', 'She was excited'], h: 'Everyone had just laughed at her rocket.' },
      { q: 'What did Priya do after her first rocket failed?', o: ['Worked out what was wrong and redesigned it', 'Gave up and left the club', 'Bought a new rocket', 'Asked someone else to build it'], h: 'Look at the second paragraph.' },
      { q: 'Which word best describes Priya?', o: ['determined', 'careless', 'boastful', 'shy'], h: 'She kept trying until she got it right.' },
    ],
  },
  {
    id: 'honeybees', d: 4, title: 'The Secret Language of Bees',
    text: 'A honeybee hive can be home to tens of thousands of bees, but only one of them is the queen. Her job is to lay eggs. Worker bees do everything else: they build the honeycomb, look after the young and collect food.\n\nWhen a worker bee finds a good patch of flowers, she flies back to the hive and performs a special “waggle dance”. The direction she waggles tells the other bees which way to fly, and the length of the dance tells them how far away the flowers are.\n\nMaking honey is hard work. In her whole life, one worker bee makes only about a twelfth of a teaspoon.',
    word: { word: 'hive', meaning: 'the home where a colony of bees lives' },
    qs: [
      { q: 'What is the queen bee’s job?', o: ['Laying eggs', 'Collecting food', 'Building honeycomb', 'Dancing'], h: 'Look at the first paragraph.' },
      { q: 'What does the length of the waggle dance tell the other bees?', o: ['How far away the flowers are', 'Which way to fly', 'What colour the flowers are', 'How many bees should go'], h: 'Read the second paragraph carefully: direction and length tell different things.' },
      { q: 'Why does the writer say making honey is hard work?', o: ['One bee makes only a tiny amount in her life', 'Honey is very heavy', 'Bees work at night', 'The queen makes it all'], h: 'Look at the last paragraph.' },
    ],
  },
  {
    id: 'great-fire', d: 4, title: 'The Great Fire of London',
    text: 'In the early hours of 2 September 1666, a fire started in Thomas Farriner’s bakery on Pudding Lane in London. At first, nobody was very worried. Fires were common, and the Lord Mayor said it could be put out easily.\n\nBut the summer had been long and dry, and the houses were made of wood, packed close together. A strong wind carried the flames from roof to roof. The fire burned for four days. It destroyed more than 13,000 homes and the old St Paul’s Cathedral.\n\nA man called Samuel Pepys wrote about the fire in his diary. He even buried his wine and a large cheese in his garden to keep them safe!',
    word: { word: 'destroyed', meaning: 'damaged so badly it could not be used' },
    qs: [
      { q: 'Where did the fire start?', o: ['In a bakery on Pudding Lane', 'In St Paul’s Cathedral', 'In Samuel Pepys’s house', 'In the Lord Mayor’s house'], h: 'Look at the first sentence.' },
      { q: 'Which of these did NOT help the fire spread?', o: ['Samuel Pepys’s diary', 'The dry summer', 'Wooden houses packed close together', 'A strong wind'], h: 'Which one is about writing, not burning?' },
      { q: 'Why was nobody very worried at first?', o: ['Fires were common and seemed easy to put out', 'It was raining', 'The fire was very small forever', 'Everyone was asleep'], h: 'Read the end of the first paragraph.' },
    ],
  },
  {
    id: 'new-girl', d: 4, title: 'The New Girl',
    text: 'Amira stood by the classroom door, holding the straps of her rucksack so tightly that her knuckles turned white. Twenty-eight faces turned to look at her.\n\n“This is Amira,” said Miss Jones. “She has just moved here from Leeds.”\n\nAt break time, Amira stood alone by the fence, pretending to read the notices. Then a football rolled across the playground and stopped at her feet. A boy called Jack waved. “Can you play? We need a goalie!”\n\nAmira hesitated for a moment. Then she grinned, picked up the ball and ran to join them.',
    word: { word: 'hesitated', meaning: 'paused because she was unsure' },
    qs: [
      { q: 'How was Amira feeling at the start?', o: ['Nervous', 'Bored', 'Angry', 'Sleepy'], h: 'Why would her knuckles turn white?' },
      { q: 'Why was Amira pretending to read the notices?', o: ['So she didn’t look lonely', 'She loved reading notices', 'She was looking for her classroom', 'Miss Jones told her to'], h: 'She was standing alone at break time.' },
      { q: 'How does Amira’s mood change by the end?', o: ['From nervous to happy', 'From happy to sad', 'From angry to calm', 'It does not change'], h: 'Compare the start with the last sentence.' },
    ],
  },
  {
    id: 'red-squirrels', d: 4, title: 'Save the Red Squirrel',
    text: 'Red squirrels have lived in Britain for thousands of years. With their tufted ears and bright orange-red fur, they are one of our best-loved animals.\n\nIn the 1800s, grey squirrels were brought here from North America. Greys are bigger and can eat food that reds cannot. They also carry a disease called squirrelpox, which does not harm them but is deadly to red squirrels.\n\nToday, red squirrels survive in only a few places, such as parts of Scotland, the Lake District and Formby, near Liverpool. People there work hard to protect them.',
    word: { word: 'survive', meaning: 'stay alive' },
    qs: [
      { q: 'Where did grey squirrels come from?', o: ['North America', 'Scotland', 'Africa', 'Formby'], h: 'Look at the second paragraph.' },
      { q: 'Why is squirrelpox such a problem for red squirrels?', o: ['It is deadly to them', 'It makes them grey', 'It makes them eat more', 'It only affects their ears'], h: 'Look at the end of the second paragraph.' },
      { q: 'What is the main purpose of this text?', o: ['To explain why red squirrels need protecting', 'To tell a funny story', 'To describe grey squirrels’ homes', 'To teach you how to catch squirrels'], h: 'Look at the title too.' },
    ],
  },

  // ---------------- level 5 ----------------
  {
    id: 'lighthouse', d: 5, title: 'Storm at the Lighthouse',
    text: 'The storm arrived at midnight. It hurled itself against the lighthouse, rattling the windows and howling around the tower like a hungry wolf.\n\nNoah climbed the spiral stairs, counting each one to stop himself thinking about the waves. At the top, the great lamp had gone dark. Far out at sea, a small fishing boat was heading straight for the rocks.\n\nHis fingers were clumsy with cold, but he found the spare bulb, twisted it into place and flicked the switch. The beam swept out across the water. Slowly, the little boat turned away from the rocks and towards the harbour. Noah sank down against the wall, suddenly exhausted, and listened to the wind lose its temper somewhere far away.',
    word: { word: 'hurled', meaning: 'threw with great force' },
    qs: [
      { q: 'Why did Noah count the stairs?', o: ['To stop himself thinking about the waves', 'To check none were missing', 'Because he was lost', 'To pass a test'], h: 'Look at the second paragraph.' },
      { q: 'The storm <i>howled like a hungry wolf</i>. Why did the writer use this image?', o: ['To make the storm sound wild and dangerous', 'To show there were wolves nearby', 'To make the story funny', 'To show the storm was quiet'], h: 'Think about what a hungry wolf sounds like.' },
      { q: 'Why did the boat turn towards the harbour?', o: ['The lighthouse beam showed where the rocks were', 'The storm stopped', 'Noah shouted to them', 'The boat ran out of fuel'], h: 'What happened just before the boat turned?' },
    ],
  },
  {
    id: 'space-station', d: 5, title: 'Life on the Space Station',
    text: 'About 400 kilometres above our heads, the International Space Station races around the Earth at around 28,000 kilometres an hour. It circles the whole planet roughly every 90 minutes, so the astronauts on board see about sixteen sunrises every day.\n\nLiving without gravity is strange. Astronauts sleep in sleeping bags strapped to the wall so they do not float away. Water forms wobbly balls in the air. Exercise is very important, because muscles and bones get weaker when they do not have to work against gravity.\n\nIn 2016, the British astronaut Tim Peake ran the London Marathon on a treadmill on the space station, strapped down with bungee cords, while thousands of runners did the real race below.',
    word: { word: 'gravity', meaning: 'the force that pulls things towards the ground' },
    qs: [
      { q: 'Why do astronauts see so many sunrises each day?', o: ['The station goes round the Earth every 90 minutes', 'The Sun moves faster in space', 'They stay awake all night', 'The station has special lights'], h: 'Look at the first paragraph.' },
      { q: 'Why is exercise so important in space?', o: ['Muscles and bones get weaker without gravity', 'Astronauts get bored', 'It keeps them warm', 'It helps them sleep'], h: 'Look at the second paragraph.' },
      { q: 'Why did Tim Peake need bungee cords?', o: ['To stop him floating off the treadmill', 'To help him run faster', 'To tie up his sleeping bag', 'To fix the treadmill'], h: 'Think about what happens without gravity.' },
    ],
  },
  {
    id: 'lionesses', d: 5, title: 'The Lionesses Roar',
    text: 'On 31 July 2022, more than 87,000 fans packed into Wembley Stadium to watch England’s women play Germany in the final of the European Championship. It was the biggest crowd ever for a Euros final, men’s or women’s.\n\nElla Toone gave England the lead with a beautiful chip over the goalkeeper, but Germany fought back to make it 1–1. The match went into extra time. Then, with just ten minutes left, Chloe Kelly poked the ball into the net from close range.\n\nEngland had won their first major women’s trophy. Across the country, girls who had never been to a football match asked if they could join a team. Many clubs said they had never had so many new players.',
    word: { word: 'major', meaning: 'very important or big' },
    qs: [
      { q: 'Who scored England’s winning goal?', o: ['Chloe Kelly', 'Ella Toone', 'A German player', 'The goalkeeper'], h: 'Look at the end of the second paragraph.' },
      { q: 'Why was the crowd special?', o: ['It was the biggest ever for a Euros final', 'It was all children', 'It was the smallest crowd ever', 'Everyone wore red'], h: 'Look at the first paragraph.' },
      { q: 'What does the last paragraph suggest about the win?', o: ['It inspired lots of girls to play football', 'It made people stop watching football', 'It only mattered to the players', 'It made clubs close down'], h: 'What happened to the number of new players?' },
    ],
  },
  {
    id: 'coral-reefs', d: 5, title: 'Rainforests of the Sea',
    text: 'Coral reefs are sometimes called the rainforests of the sea. They cover only a tiny part of the ocean floor, yet about a quarter of all sea creatures live on or around them.\n\nAlthough coral looks like rock or plants, it is actually made by millions of tiny animals called polyps. Each polyp builds a hard skeleton around itself, and over hundreds of years these skeletons join together to form a reef.\n\nThe largest reef in the world is the Great Barrier Reef, off the coast of Australia. Sadly, reefs are in danger. When the sea becomes too warm, corals lose the colourful algae that live inside them and turn white. This is called bleaching, and if it lasts too long, the coral dies.',
    word: { word: 'polyps', meaning: 'tiny sea animals that build coral' },
    qs: [
      { q: 'Why are coral reefs called the rainforests of the sea?', o: ['They are home to a huge number of creatures', 'They are covered in trees', 'It rains a lot on them', 'They are green'], h: 'Look at the first paragraph.' },
      { q: 'What is coral actually made by?', o: ['Tiny animals called polyps', 'Plants', 'Rocks from volcanoes', 'Fish'], h: 'Look at the second paragraph.' },
      { q: 'What causes coral bleaching?', o: ['The sea becoming too warm', 'Too many fish', 'Sunlight being too dim', 'Divers touching it'], h: 'Look at the last paragraph.' },
    ],
  },
  {
    id: 'whistle', d: 5, title: 'The Whistle',
    text: 'Grandma had a whistle that could stop a dog at fifty paces. Theo had tried for months to copy it. He puckered his lips, he blew until his face turned purple, but all that came out was a sad little puff of air, like a tyre going flat.\n\n“It’ll come,” Grandma said, every time. “You’re trying too hard.”\n\nOne afternoon, lying in the garden and thinking about nothing in particular, Theo pursed his lips without thinking. A clear, bright note floated up into the air. He sat bolt upright. Next door’s dog stopped dead in the middle of the lawn and stared at him.\n\nFrom the kitchen window, Grandma raised her teacup in salute.',
    word: { word: 'salute', meaning: 'a gesture of respect or congratulations' },
    qs: [
      { q: 'What does <i>a whistle that could stop a dog at fifty paces</i> tell us about Grandma’s whistle?', o: ['It was very loud and powerful', 'It was very quiet', 'It frightened dogs away', 'It only worked on Grandma’s dog'], h: 'Fifty paces is a long way.' },
      { q: 'What finally helped Theo whistle?', o: ['Relaxing and not trying so hard', 'Practising with Grandma', 'Blowing harder than ever', 'Buying a whistle'], h: 'What was he doing when it happened? Remember Grandma’s advice.' },
      { q: 'Why did Grandma raise her teacup?', o: ['To congratulate Theo', 'To ask for more tea', 'To call the dog', 'To tell Theo to come inside'], h: 'Look at the word "salute".' },
    ],
  },

  // ---------------- level 6 ----------------
  {
    id: 'night-train', d: 6, title: 'The Night Train (a poem)',
    text: 'The night train rattles through the dark,\nA dragon made of steel,\nIts golden windows, one by one,\nSpin past like a fairground wheel.\n\nIt thunders over sleeping towns\nAnd whispers past the sea,\nIt carries dreams in every seat\nAnd one of them is me.',
    word: { word: 'thunders', meaning: 'makes a loud, deep, rumbling noise' },
    qs: [
      { q: 'The poet calls the train <i>a dragon made of steel</i>. What is this an example of?', o: ['A metaphor', 'A question', 'A list', 'An instruction'], h: 'The poem says the train IS a dragon, without "like" or "as".' },
      { q: 'Why might the poet say the train <i>whispers past the sea</i>?', o: ['The sound of the sea makes the train seem quieter', 'The train stops by the sea', 'Nobody is on the train there', 'The train is broken'], h: 'Compare "thunders" with "whispers". What might change near the sea?' },
      { q: 'Where is the poet in the poem?', o: ['On the train', 'Watching from a town', 'On the beach', 'At a fairground'], h: 'Read the last line.' },
    ],
  },
  {
    id: 'evacuee', d: 6, title: 'A Letter Home, 1940',
    text: 'Dear Mum,\n\nI am sorry I have not written sooner. The journey took all day, and the train was so full that I sat on my suitcase with my gas mask box on my knees.\n\nI am staying with Mrs Hughes on a farm in Wales. She is quite strict about wiping my boots, but she makes the best apple pie I have ever tasted (don’t tell Gran). There are cows, and a sheepdog called Meg who follows me everywhere.\n\nThe other children speak Welsh at school, so I have started learning some words. I still miss you and the noise of our street. It is so quiet here at night that I can hear the owls.\n\nPlease write soon.\nYour loving son,\nArthur',
    word: { word: 'evacuee', meaning: 'someone moved away from danger to a safer place' },
    qs: [
      { q: 'Why did Arthur sit on his suitcase?', o: ['The train was very full', 'He was too tired to stand', 'He was guarding it', 'There were no seats on any trains'], h: 'Look at the first paragraph after "Dear Mum".' },
      { q: 'Why does Arthur write <i>(don’t tell Gran)</i>?', o: ['He doesn’t want to hurt Gran’s feelings about her own pie', 'Gran doesn’t like apples', 'Gran would be cross he is on a farm', 'It is a secret code'], h: 'What is he comparing?' },
      { q: 'Which sentence best sums up Arthur’s feelings?', o: ['He is settling in but still misses home', 'He hates everything about Wales', 'He never wants to go home', 'He is frightened of Mrs Hughes'], h: 'He mentions good things and one thing he misses.' },
    ],
  },
  {
    id: 'clockmaker', d: 6, title: 'The Clockmaker’s Apprentice',
    text: 'Every clock in Mr Grimsby’s shop told a different time, and every one of them was correct.\n\n“That one,” he said, tapping a tall clock with a moon on its face, “shows the time in the place you most want to be. And this little one shows how long until you next laugh.”\n\nElla, his new apprentice, stared at the small silver clock. Its hands were spinning backwards.\n\n“What does it mean when it goes backwards?” she asked.\n\nMr Grimsby’s eyes twinkled. “It means,” he said, “that you are laughing right now. You just haven’t noticed.”\n\nAnd Ella realised, to her surprise, that he was right.',
    word: { word: 'apprentice', meaning: 'someone learning a skill by working with an expert' },
    qs: [
      { q: 'What is unusual about the clocks in the shop?', o: ['They each measure something magical', 'They are all broken', 'They all show the same time', 'They are made of moons'], h: 'Read what Mr Grimsby says about two of them.' },
      { q: 'What does <i>his eyes twinkled</i> suggest about Mr Grimsby?', o: ['He was amused and kind', 'He was angry', 'He was about to cry', 'He was tired'], h: 'Think about when people’s eyes twinkle.' },
      { q: 'Which word best describes the mood of this story?', o: ['Magical and warm', 'Dark and scary', 'Sad and lonely', 'Fast and exciting'], h: 'How does the story make you feel?' },
    ],
  },
  {
    id: 'plastic', d: 6, title: 'It’s Time to Ditch the Plastic',
    text: 'Imagine a beach where the sand is sprinkled with bottle tops instead of shells. Sadly, you don’t have to imagine: beaches like this exist all over the world.\n\nScientists estimate that millions of tonnes of plastic end up in the ocean every single year. Turtles mistake plastic bags for jellyfish. Seabirds feed bottle tops to their chicks. Plastic can take hundreds of years to break down.\n\nBut there is good news: we can all help. Carry a reusable water bottle. Say no to plastic straws. Pick up litter when you see it. If every person in Britain made just one small change, together we would make a huge difference.\n\nSo what are you waiting for? The ocean needs you!',
    word: { word: 'reusable', meaning: 'able to be used again' },
    qs: [
      { q: 'What is the writer trying to do?', o: ['Persuade readers to use less plastic', 'Tell a story about a turtle', 'Explain how plastic is made', 'Describe a holiday'], h: 'Look at the last two paragraphs.' },
      { q: 'Why does the writer start with <i>Imagine a beach…</i>?', o: ['To make the reader picture the problem', 'To describe the writer’s holiday', 'To tell the reader to go to the beach', 'To show that beaches are safe'], h: 'What does it make you do in your head?' },
      { q: 'Which is a <b>rhetorical question</b> from the text?', o: ['So what are you waiting for?', 'Carry a reusable water bottle.', 'Plastic can take hundreds of years to break down.', 'The ocean needs you!'], h: 'A rhetorical question doesn’t expect an answer. It makes you think.' },
    ],
  },
  {
    id: 'ada-lovelace', d: 6, title: 'Ada Lovelace',
    text: 'Ada Lovelace was born in London in 1815. Her father was the famous poet Lord Byron, but her mother made sure Ada studied maths and science, which was very unusual for a girl at that time.\n\nAda became friends with the inventor Charles Babbage, who had designed a machine called the Analytical Engine. It was never finished, but Ada wrote a set of step-by-step instructions showing how it could solve a difficult maths problem. Many people now describe this as the first computer program, written more than a hundred years before modern computers existed.\n\nAda also imagined that one day such machines might make music or pictures, not just do sums. Today, Ada Lovelace Day celebrates women in science, technology, engineering and maths.',
    word: { word: 'program', meaning: 'a set of instructions a computer follows (this is the computer spelling!)' },
    qs: [
      { q: 'Why was Ada’s education unusual?', o: ['Few girls studied maths and science then', 'She went to school in France', 'She was taught by Lord Byron', 'She never went to school'], h: 'Look at the first paragraph.' },
      { q: 'Why is Ada’s program so remarkable?', o: ['It was written long before modern computers existed', 'It made the machine play music', 'It finished the Analytical Engine', 'It was very short'], h: 'Look at the end of the second paragraph.' },
      { q: 'What does the last paragraph show about Ada?', o: ['She had great imagination about the future', 'She did not like maths', 'She built computers herself', 'She wanted to be a poet'], h: 'What did she imagine machines might do?' },
    ],
  },
];

export function passagesAt(d) {
  return PASSAGES.filter((p) => p.d === d);
}
