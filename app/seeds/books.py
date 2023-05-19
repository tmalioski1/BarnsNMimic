from app.models import db, Book, environment, SCHEMA
import datetime

def seed_books():
  demo_book = Book(
    publisher_id = 1, title='The Prince', author= 'Niccolò Machiavelli',  price_paperback=12.50, price_hardcover=20.95, price_eBook=10.95, genre='Non-Fiction', overview= 'A timeless classic!', editorial_review= 'Continues to captivate centuries later!', publication_date= '05/29/2017', publisher= 'Fall River Press', cover_art='https://kbimages1-a.akamaihd.net/a319db5c-ee33-41d3-b25b-c64e3921f618/1200/1200/False/the-prince-13.jpg', pages= 128)
  demo_book2 = Book(
    publisher_id = 3, title='Meditations', author= 'Marcus Aurelius',  price_paperback=9.50, price_hardcover=24.00, price_eBook=10.95, genre='Non-Fiction', overview= 'A true masterpiece!', editorial_review= 'Ancient wisdom still relevant for today.', publication_date= '02/10/1996', publisher= 'Penguin Publishing Group', cover_art='https://kbimages1-a.akamaihd.net/233196f9-1586-481b-8e71-f8d08357337b/1200/1200/False/meditations-41.jpg', pages= 304)
  demo_book3 = Book(
    publisher_id = 3,  title='Do Androids Dream of Electric Sheep?', author= 'Philip K. Dick', price_paperback=15.30, price_hardcover=24.00, price_eBook=13.99, genre='Science Fiction', overview= 'Thrilling!', editorial_review= 'Thought provoking.', publication_date= '04/26/2014', publisher= 'Random House Worlds', cover_art='https://m.media-amazon.com/images/I/41zIEWqtWYL._SX331_BO1,204,203,200_.jpg', pages= 240)
  demo_book4 = Book(
    publisher_id = 3,  title='The Godfather', author= 'Mario Puzo', price_paperback=15.99, price_hardcover=32.50, price_eBook=12.99, genre='Fiction', overview= 'With its brilliant and brutal portrayal of the Corleone family, The Godfather burned its way into our national consciousness. This unforgettable saga of crime and corruption, passion and loyalty continues to stand the test of time, as the definitive novel of the Mafia underworld.', editorial_review= 'A staggering triumph...The definitive novel about a sinister fraternity of crime.”—The Saturday Review', publication_date= '04/26/1969', publisher= 'Penguin Publishing Group', cover_art='https://prodimage.images-bn.com/pimages/9780451205766_p0_v5_s1200x630.jpg', pages= 448)
  demo_book5 = Book(
    publisher_id = 3,  title='Democracy Awakening: Notes on the State of America', author= 'Heather Cox Richardson', price_paperback=15.99, price_hardcover=30.00, price_eBook=14.99, genre='Non-Fiction', overview= "From historian and author of the popular daily newsletter LETTERS FROM AN AMERICAN, a vital narrative that explains how America, once a beacon of democracy, now teeters on the brink of autocracy — and how we can turn back.In the midst of the impeachment crisis of 2019, Heather Cox Richardson launched a daily Facebook essay providing the historical background of the daily torrent of news. It soon turned into a newsletter and its readership ballooned to more than 2 million dedicated readers who rely on her plainspoken and informed take on the present and past in America.In Democracy Awakening, Richardson crafts a compelling and original narrative, explaining how, over the decades, a small group of wealthy people have made war on American ideals. By weaponizing language and promoting false history they have led us into authoritarianism — creating a disaffected population and then promising to recreate an imagined past where those people could feel important again. She argues that taking our country back starts by remembering the elements of the nation's true history that marginalized Americans have always upheld. Their dedication to the principles on which this nation was founded has enabled us to renew and expand our commitment to democracy in the past. Richardson sees this history as a roadmap for the nation's future. Richardson's talent is to wrangle our giant, meandering, and confusing news feed into a coherent story that singles out what we should pay attention to, what the precedents are, and what possible paths lie ahead. In her trademark calm prose, she is realistic and optimistic about the future of democracy. Her command of history allows her to pivot effortlessly from the Founders to the abolitionists to Reconstruction to Goldwater to Mitch McConnell, highlighting the political legacies of the New Deal, the lingering fears of socialism, the death of the liberal consensus and birth of “movement conservatism.”Many books tell us what has happened over the last five years. Democracy Awakening explains how we got to this perilous point, what our history really tells us about ourselves, and what the future of democracy can be.", editorial_review= 'A sensational debut.”—The Saturday Review', publication_date= '04/25/2023', publisher= 'Penguin Publishing Group', cover_art='https://m.media-amazon.com/images/I/510PXreMAdL.jpg', pages= 418)
  demo_book6 = Book(
    publisher_id = 3,  title='And There Was Light: Abraham Lincoln and the American Struggle', author= 'Jon Meacham', price_paperback=22.00, price_hardcover=32.00, price_eBook=14.99, genre='Non-Fiction', overview= "A president who governed a divided country has much to teach us in a twenty-first-century moment of polarization and political crisis. Hated and hailed, excoriated and revered, Abraham Lincoln was at the pinnacle of American power when implacable secessionists gave no quarter in a clash of visions bound up with money, race, identity, and faith. In him we can see the possibilities of the presidency as well as its limitations.  At once familiar and elusive, Lincoln tends to be seen as the greatest of American presidents—a remote icon—or as a politician driven more by calculation than by conviction. This illuminating new portrait gives us a very human Lincoln—an imperfect man whose moral antislavery commitment, essential to the story of justice in America, began as he grew up in an antislavery Baptist community; who insisted that slavery was a moral evil; and who sought, as he put it, to do right as God gave him to see the right. This book tells the story of Lincoln from his birth on the Kentucky frontier in 1809 to his leadership during the Civil War to his tragic assassination in 1865: his rise, his self-education, his loves, his bouts of depression, his political failures, his deepening faith, and his persistent conviction that slavery must end. In a nation shaped by the courage of the enslaved of the era and by the brave witness of Black Americans, Lincoln's story illustrates the ways and means of politics in a democracy, the roots and durability of racism, and the capacity of conscience to shape events.", editorial_review= 'Pulitzer winner Meacham (His Truth Is Marching On) more than justifies yet another Lincoln biography in this nuanced and captivating look at the president\'s “struggle to do right as he defined it within the political universe he and his country inhabited.”', publication_date= '10/18/2022', publisher= 'Random House Publishing Group', cover_art='https://m.media-amazon.com/images/I/71X21jyuZPL.jpg', pages= 720)

  demo_book7 = Book(
    publisher_id = 3,  title='The Phantom Prince: My Life with Ted Bundy', author= 'Elizabeth Kendall', price_paperback=13.99, price_hardcover=22.49, price_eBook=10.99, genre='True Crime', overview= """The inspiration for the five-part Amazon Original docuseries Ted Bundy: Falling for a Killer.


Now in paperback, this updated, expanded edition of The Phantom Prince, Elizabeth Kendall’s 1981 memoir detailing her six-year relationship with serial killer Ted Bundy, includes a new introduction and a new afterword by the author, never-before-seen photos, and a startling new chapter from the author’s daughter, Molly, who has not previously shared her story. Bundy is one of the most notorious serial killers in American history and one of the most publicized to this day. However, very rarely do we hear from the women he left behind—the ones forgotten as mere footnotes in this tragedy. The Phantom Prince chronicles Elizabeth Kendall’s intimate relationship with Ted Bundy and its eventual unraveling. As much as has been written about Bundy, it’s remarkable to hear the perspective of people who shared their daily lives with him for years. This gripping account presents a remarkable examination of a charismatic personality that masked unimaginable darkness.""", editorial_review= 'It’s apparent from the very first line of The Phantom Prince to Molly’s final chapter … that Kendall’s voice, as well as that of her daughter, are needed. - Clémence Michallon', publication_date= '10/18/2022', publisher= 'Abrams Press', cover_art='https://images-na.ssl-images-amazon.com/images/I/71Y7qq5eVGL._AC_UL210_SR210,210_.jpg', pages= 224)

  demo_book8 = Book(
    publisher_id = 3,  title='It Starts with Us: A Novel', author= 'Colleen Hoover', price_paperback=17.99, price_hardcover=22.49, price_eBook=13.99, genre='Romance', overview= "Before It Ends with Us, it started with Atlas. Colleen Hoover tells fan favorite Atlas’s side of the story and shares what comes next in this long-anticipated sequel to the “glorious and touching” (USA TODAY) #1 New York Times bestseller It Ends with Us. Lily and her ex-husband, Ryle, have just settled into a civil coparenting rhythm when she suddenly bumps into her first love, Atlas, again. After nearly two years separated, she is elated that for once, time is on their side, and she immediately says yes when Atlas asks her on a date. But her excitement is quickly hampered by the knowledge that, though they are no longer married, Ryle is still very much a part of her life—and Atlas Corrigan is the one man he will hate being in his ex-wife and daughter’s life.Switching between the perspectives of Lily and Atlas, It Starts with Us picks up right where the epilogue for the “gripping, pulse-pounding” (Sarah Pekkanen, author of Perfect Neighbors) bestselling phenomenon It Ends with Us left off. Revealing more about Atlas’s past and following Lily as she embraces a second chance at true love while navigating a jealous ex-husband, it proves that “no one delivers an emotional read like Colleen Hoover” (Anna Todd, New York Times bestselling author).", editorial_review= 'Hoover is as unafraid as ever to explore the darker and more vulnerable aspects of love, expertly demonstrating the soul-deep trust required to reach happily after ever. The author’s fans will be thrilled. - Publishers Weekly', publication_date= '10/18/2022', publisher= 'Atria Books', cover_art='https://m.media-amazon.com/images/I/51VC+Vru96L._SY344_BO1,204,203,200_.jpg', pages= 336)

  demo_book9 = Book(
    publisher_id = 3,  title='Mastering the Art of French Cooking', author= 'Julia Child', price_paperback=28.99, price_hardcover=40.99, price_eBook=1.99, genre='Cooking', overview= "Featuring 524 delicious recipes and over 100 instructive illustrations to guide readers every step of the way, Mastering the Art of French Cooking offers something for everyone, from seasoned experts to beginners who love good food and long to reproduce the savory delights of French cuisine. Julia Child, Simone Beck, and Louisette Bertholle break down the classic foods of France into a logical sequence of themes and variations rather than presenting an endless and diffuse catalogue of dishes—from historic Gallic masterpieces to the seemingly artless perfection of a dish of spring-green peas. Throughout, the focus is on key recipes that form the backbone of French cookery and lend themselves to an infinite number of elaborations—bound to increase anyone’s culinary repertoire.“Julia has slowly but surely altered our way of thinking about food. She has taken the fear out of the term ‘haute cuisine.’ She has increased gastronomic awareness a thousandfold by stressing the importance of good foundation and technique, and she has elevated our consciousness to the refined pleasures of dining.\" —Thomas Keller, The French Laundry", editorial_review= '"Has it really been 40 years since Julia Child rescued Americans from dreary casseroles? This reissue ... is what a cookbook should be: packed with sumptuous recipes, detailed instructions, and precise line drawings. Some of the instructions look daunting, but as Child herself says in the introduction, \'If you can read, you can cook.\'" —Entertainment Weekly', publication_date= '09/12/1983', publisher= 'Knopf Doubleday Publishing Group', cover_art='https://m.media-amazon.com/images/I/91l0C5Ic9PL._AC_UF1000,1000_QL80_.jpg', pages= 752)

  demo_book10 = Book(
    publisher_id = 3,  title='My Name is Barbra', author= 'Barbra Streisand', price_paperback=28.99, price_hardcover=40.50, price_eBook=17.99, genre='Biography', overview= "Barbra Streisand is by any account a living legend, a woman who in a career spanning six decades has excelled in every area of entertainment. She is among the handful of EGOT winners (Emmy, Grammy, Oscar, and Tony) and has one of the greatest and most recognizable voices in the history of popular music. She has been nominated for a Grammy 46 times, and with Yentl she became the first woman to write, produce, direct, and star in a major motion picture. In My Name Is Barbra, she tells her own story about her life and extraordinary career, from growing up in Brooklyn to her first star-making appearances in New York nightclubs to her breakout performance in Funny Girl (musical and film) to the long string of successes in every medium in the years that followed. The book is, like Barbra herself, frank, funny, opinionated, and charming. She recounts her early struggles to become an actress, eventually turning to singing to earn a living; the recording of some of her acclaimed albums; the years of effort involved in making Yentl; her direction of The Prince of Tides; her friendships with figures ranging from Marlon Brando to Madeleine Albright; her political advocacy; and the fulfillment she’s found in her marriage to James Brolin. No entertainer’s memoir has been more anticipated than Barbra Streisand’s, and this engrossing and delightful book will be eagerly welcomed by her millions of fans.", editorial_review= 'A revealing look at a music legend. - New York Times Book Review', publication_date= '03/14/2023', publisher= 'Penguin Publishing Group', cover_art='https://images.penguinrandomhouse.com/cover/9780525429524', pages= 341)

  demo_book11 = Book(
    publisher_id = 3,  title='The Road to Unfreedom: Russia, Europe, America', author= 'Timothy Snyder', price_paperback=11.99, price_hardcover=28.99, price_eBook=11.99, genre='Current Events', overview= "With the end of the Cold War, the victory of liberal democracy seemed final. Observers declared the end of history, confident in a peaceful, globalized future. This faith was misplaced. Authoritarianism returned to Russia, as Vladimir Putin found fascist ideas that could be used to justify rule by the wealthy. In the 2010s, it has spread from east to west, aided by Russian warfare in Ukraine and cyberwar in Europe and the United States.  Russia found allies among nationalists, oligarchs, and radicals everywhere, and its drive to dissolve Western institutions, states, and values found resonance within the West itself.  The rise of populism, the British vote against the EU, and the election of Donald Trump were all Russian goals, but their achievement reveals the vulnerability of Western societies. In this forceful and unsparing work of contemporary history, based on vast research as well as personal reporting, Snyder goes beyond the headlines to expose the true nature of the threat to democracy and law. To understand the challenge is to see, and perhaps renew, the fundamental political virtues offered by tradition and demanded by the future. By revealing the stark choices before us—between equality or oligarchy, individuality or totality, truth and falsehood—Snyder restores our understanding of the basis of our way of life, offering a way forward in a time of terrible uncertainty.", editorial_review= 'Sobering analysis... - New York Times Book Review', publication_date= '04/09/2019', publisher= 'Crown Publishing Group', cover_art='https://m.media-amazon.com/images/I/71xUgLu-xdL._AC_UF1000,1000_QL80_.jpg', pages= 368)

  demo_book12 = Book(
    publisher_id = 3, title='Tasting History: Explore the Past through 4,000 Years of Recipes (A Cookbook)', author= 'Max Miller',  price_paperback=19.50, price_hardcover=27.00, price_eBook=14.99, genre='Non-Fiction', overview= """Begin your very own food journey through the centuries and around the world with the first cookbook from the beloved YouTube channel Tasting History with Max Miller.

  What began as a passion project when Max Miller was furloughed during Covid-19 has become a viral YouTube sensation. The Tasting History with Max Miller channel has thrilled food enthusiasts and history buffs alike as Miller recreates a dish from the past, often using historical recipes from vintage texts, but updated for modern kitchens as he tells stories behind the cuisine and culture. From ancient Rome to Ming China to medieval Europe and beyond, Miller has collected the best-loved recipes from around the world and has shared them with his fans. Now, with beautiful photographs portraying the dishes and historical artwork throughout. Including the original recipe and Miller’s modern recreation, this cookbook is a must-have for any avid cook or history fan looking to experience delicious recipes from the past.""", editorial_review= 'Even if we never make these dishes of ancient times, Miller’s book is a fascinating read.” —New York Journal of Books', publication_date= '04/18/2023', publisher= 'S&S/Simon Element', cover_art='https://images-na.ssl-images-amazon.com/images/I/81u5A4IvUfL._AC_UL210_SR210,210_.jpg', pages= 256)


  demo_book13 = Book(
    publisher_id = 3, title='Tasting History: Explore the Past through 4,000 Years of Recipes (A Cookbook)', author= 'Max Miller',  price_paperback=19.50, price_hardcover=27.00, price_eBook=14.99, genre='Cooking', overview= """Begin your very own food journey through the centuries and around the world with the first cookbook from the beloved YouTube channel Tasting History with Max Miller.

What began as a passion project when Max Miller was furloughed during Covid-19 has become a viral YouTube sensation. The Tasting History with Max Miller channel has thrilled food enthusiasts and history buffs alike as Miller recreates a dish from the past, often using historical recipes from vintage texts, but updated for modern kitchens as he tells stories behind the cuisine and culture. From ancient Rome to Ming China to medieval Europe and beyond, Miller has collected the best-loved recipes from around the world and has shared them with his fans. Now, with beautiful photographs portraying the dishes and historical artwork throughout. Including the original recipe and Miller’s modern recreation, this cookbook is a must-have for any avid cook or history fan looking to experience delicious recipes from the past.""", editorial_review= 'Even if we never make these dishes of ancient times, Miller’s book is a fascinating read.” —New York Journal of Books', publication_date= '04/18/2023', publisher= 'S&S/Simon Element', cover_art='https://images-na.ssl-images-amazon.com/images/I/81u5A4IvUfL._AC_UL210_SR210,210_.jpg', pages= 256)

  demo_book14 = Book(
    publisher_id = 3, title='Tasting History: Explore the Past through 4,000 Years of Recipes (A Cookbook)', author= 'Max Miller',  price_paperback=19.50, price_hardcover=27.00, price_eBook=14.99, genre='Non-Fiction', overview= """”You don’t need to have a wood-burning stove or fireplace to be captivated by the craft and lore surrounding a Stone Age method of creating heat.” ―Boston Globe

The latest Scandinavian publishing phenomenon is not a Stieg Larsson thriller, and it’s not the comfort of Danish Hygge. It’s a full-color practical book about the art and craft of handling wood for heating that has become an international bestseller, selling over 200,000 copies in Norway and Sweden.

Norwegian Wood provides useful advice on the rustic hows and whys of taking care of your heating needs, but it’s also a thoughtful attempt to understand man’s age-old predilection for stacking wood and passion for open fires. Chapters include:
The Cold
The Forest
The Tools
The Chopping Block
The Woodpile
The Seasoning
The Stove
The Fire
The author, Lars Mytting, writes, “The factual material in this book represents the distilled wisdom of encounters with people who are passionate about wood, enthusiasts as well as professional researchers. I have benefitted greatly from my conversations with experts in the fields of combustion and silviculture. . . . Along the way I’ve tried out most of the techniques I’ve been introduced to. I’ve dried finely chopped oak in our kitchen oven, struggled to build a beehive woodpile, miscalculated the trajectory of a felled pine. And I’ve been on a quest to discover the soul of the wood fire.” With his help, you’ll begin your quest to discover the joys of wood and wood fire.

An intriguing window into the exoticism of Scandinavian culture, the book also features enough inherently interesting facts and anecdotes and inspired prose to make it universally appealing. The US edition is a fully updated version of the Norwegian original and includes an appendix of US-based resources and contacts.""", editorial_review= 'You don’t need to have a wood-burning stove or fireplace to be captivated by the craft and lore surrounding a Stone Age method of creating heat. -The Boston Globe', publication_date= '10/06/2015', publisher= 'Abrams Image', cover_art='https://cdn.shopify.com/s/files/1/0560/2236/8450/products/norwegian_wood_206815d2-a4f9-4495-8e90-11569a33927b_1200x.jpg?v=1627094257', pages= 192)


  demo_book15 = Book(
    publisher_id = 3, title='The 32 Principles: Harnessing the Power of Jiu-Jitsu to Succeed in Business, Relationships, and Lif)', author= 'Rener Gracie',  price_paperback=19.50, price_hardcover=29.95, price_eBook=14.99, genre='Non-Fiction', overview= """Overcome any obstacle life throws at you by thinking, and reacting like a world-class martial artist—without ever setting foot on the mat.

Jiu-jitsu is more than a martial art; it is a lifestyle that promotes health, confidence, self-determination, and being in balance with the world. Now, for the first time, the most important and life-enhancing principles of jiu-jitsu can be applied to every aspect of life.

In The 32 Principles, famed jiu-jitsu instructor Rener Gracie, who has coached more than 350,000 students in 196 countries, presents the core teachings of jiu-jitsu and explains how they can apply to all of our daily lives, including:

The Pyramid Principle and the importance of investing in a strong foundation
The Acceptance Principle and recognizing when it’s better to yield than to resist
The Pivot Principle and the value of changing your perspective to increase your effectiveness
The Redirection Principle and using unfavorable circumstances to create favorable outcomes

Intended for both longtime fans and practitioners of the martial arts, as well as those completely unfamiliar with jiu-jitsu—and 32 companion videos of each principle’s physical application for self defense from Rener himself—will help you gain balance and control over yourself, home, work, family, and personal and professional relationships. Along with multi-award-winning author Paul Volponi, this book features contributions from more than 40 champion athletes, top flight coaches, and others who have benefited from these principles in real life. .

Every obstacle is a technique waiting to be discovered. Learn how to live life through the lens of a martial arts master, and no challenge will knock you down for long.""", editorial_review= 'Wonderful business advice. -The Boston Globe', publication_date= '10/06/2022', publisher= 'BenBella Books, Inc.', cover_art='https://m.media-amazon.com/images/I/710itppmOrL._AC_UF1000,1000_QL80_.jpg', pages= 240)

  demo_book16 = Book(
    publisher_id = 3, title='Rich Dad Poor Dad: What the Rich Teach Their Kids about Money That the Poor and Middle Class Do Not!', author= 'Robert T. Kiyosaki',  price_paperback=15.99, price_hardcover=29.95, price_eBook=14.49, genre='Non-Fiction', overview= """April of 2022 marks a 25-year milestone for the personal finance classic Rich Dad Poor Dad that still ranks as the #1 Personal Finance book of all time. And although 25 years have passed since Rich Dad Poor Dad was first published, readers will find that very little in the book itself has changed — and for good reason. While so much in our world is changing a high speed, the lessons about money and the principles of Rich Dad Poor Dad haven’t changed. Today, as money continues to play a key role in our daily lives, the messages in Robert Kiyosaki’s international bestseller are more timely and more important than ever.

Milestones
While there is a milestone  to commemorate — and a new section in the book on Why Milestones Are Important — preserving the integrity of the original content is testimony to the fact that this book has truly stood the test of time. The sidebars throughout the book (that were updated for the 20-year anniversary edition) have been updated again, but the core principles that parents and grandparents — those who embraced Robert’s story and messages 25 years ago — are sharing them with new generations who have found that its timeless wisdom and no-nonsense lessons can be applied to anyone’s life and their vision for a future that includes taking control of their finances.

People of all cultures and countries celebrate milestones. We use them to measure time, mark progress, reflect on the lessons we’ve learned, and celebrate accomplishments… and they give meaning to our life’s journey. They are a way that we integrate past, present, and future… looking back at where we started, where we are today… and the promise of all that the future can hold.

In the quarter century that has passed since Rich Dad Poor Dad was first published — 25 years since April 8, 1997 — so many things in our world have changed. But the one thing that has not changed is the pressing need for and the power of financial education. Money is still a mainstay of our lives, like it or not, and technology has brought both speed and innovations to the world of money. In an ever-changing world, we can all still get smarter when it comes to money… and learn as much as we can to secure our future.

Still the One… #1

Today Rich Dad Poor Dad consistently ranks among bestsellers around the world in the categories of Personal Finance, Parenting, and Investing, has been translated into 38 languages, and has sold more than 40 million copies worldwide.""", editorial_review= 'Wonderful business advice. -The Boston Globe', publication_date= '04/05/2022', publisher= 'Plata Publishing, LLC.', cover_art='https://pictures.abebooks.com/isbn/9781612680019-us.jpg', pages= 336)

  demo_book17 = Book(
    publisher_id = 3, title='The 7 Habits of Highly Effective People: 30th Anniversary Edition', author= 'Stephen R. Covey',  price_paperback=17.09, price_hardcover=30.00, price_eBook=13.99, genre='Non-Fiction', overview= """*New York Times bestseller—over 40 million copies sold*
*The #1 Most Influential Business Book of the Twentieth Century*

One of the most inspiring and impactful books ever written, The 7 Habits of Highly Effective People has captivated readers for nearly three decades. It has transformed the lives of presidents and CEOs, educators and parents—millions of people of all ages and occupations. Now, this 30th anniversary edition of the timeless classic commemorates the wisdom of the 7 Habits with modern additions from Sean Covey.

The 7 Habits have become famous and are integrated into everyday thinking by millions and millions of people. Why? Because they work!

With Sean Covey’s added takeaways on how the habits can be used in our modern age, the wisdom of the 7 Habits will be refreshed for a new generation of leaders.

They include:
Habit 1: Be Proactive
Habit 2: Begin with the End in Mind
Habit 3: Put First Things First
Habit 4: Think Win/Win
Habit 5: Seek First to Understand, Then to Be Understood
Habit 6: Synergize
Habit 7: Sharpen the Saw

This beloved classic presents a principle-centered approach for solving both personal and professional problems. With penetrating insights and practical anecdotes, Stephen R. Covey reveals a step-by-step pathway for living with fairness, integrity, honesty, and human dignity—principles that give us the security to adapt to change and the wisdom and power to take advantage of the opportunities that change creates.""", editorial_review= '[Thirty] years after it first appeared, the wisdom of The 7 Habits is more relevant than ever. On an individual level people are burning out, and on a collective level we are burning up the planet. So Dr. Covey’s emphasis on self-renewal and his understanding that leadership and creativity require us to tap into our own physical, mental, and spiritual resources are exactly what we need now.”—Arianna Huffington', publication_date= '05/19/2020', publisher= 'Simon & Schuster', cover_art='https://m.media-amazon.com/images/I/412HbKRpXjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', pages= 464)

  demo_book18 = Book(
    publisher_id = 3,  title='House of Flame and Shadow (Crescent City Series #3)', author= 'Sarah J. Maas', price_paperback=15.99, price_hardcover=25.50, price_eBook=11.99, genre='Fiction', overview= """The stunning third book in the sexy, action-packed Crescent City series, following the global bestsellers House of Earth and Blood and House of Sky and Breath.

Bryce Quinlan never expected to see a world other than Midgard, but now that she has, all she wants is to get back. Everything she loves is in Midgard: her family, her friends, her mate. Stranded in a strange new world, she's going to need all her wits about her to get home again. And that's no easy feat when she has no idea who to trust.

Hunt Athalar has found himself in some deep holes in his life, but this one might be the deepest of all. After a few brief months with everything he ever wanted, he's in the Asteri's dungeons again, stripped of his freedom and without a clue as to Bryce's fate. He's desperate to help her, but until he can escape the Asteri's leash, his hands are quite literally tied.

In this sexy, breathtaking sequel to the #1 bestsellers House of Earth and Blood and House of Sky and Breath, Sarah J. Maas's Crescent City series reaches new heights as Bryce and Hunt's world is brought to the brink of collapse-with its future resting on their shoulders.""", editorial_review= '“A dizzying, suspenseful whirl that surprises at every turn.” —Entertainment Weekly (House of Earth and Blood)', publication_date= '01/30/2023', publisher= 'Bloomsbury USA', cover_art='https://prodimage.images-bn.com/pimages/9781635574104_p0_v5_s1200x630.jpg', pages= 816)

  demo_book19 = Book(
    publisher_id = 3,  title='Identity: A Novel', author= 'Nora Roberts', price_paperback=15.99, price_hardcover=21.00, price_eBook=14.99, genre='Fiction', overview= """The #1 New York Times-bestselling author's terrifying new thriller about one man's ice-cold malice, and one woman's fight to reclaim her life.

Former Army brat Morgan Albright has finally planted roots in a friendly neighborhood near Baltimore. Her friend and roommate Nina helps her make the mortgage payments, as does Morgan's job as a bartender. But after she and Nina host their first dinner party—attended by Luke, the flirtatious IT guy who'd been chatting her up at the bar—her carefully built world is shattered. The back door glass is broken, cash and jewelry are missing, her car is gone, and Nina lies dead on the floor.

Soon, a horrific truth emerges: It was Morgan who let the monster in. "Luke" is actually a cold-hearted con artist named Gavin who targets a particular type of woman, steals her assets and identity, and then commits his ultimate goal: murder.

What the FBI tells Morgan is beyond chilling. Nina wasn't his type. Morgan is. Nina was simply in the wrong place at the wrong time. And Morgan's nightmare is just beginning. Soon she has no choice but to flee to her mother's home in Vermont. While she struggles to build something new, she meets another man, Miles Jameson. He isn't flashy or flirtatious, and his family business has deep roots in town. But Gavin is still out there hunting new victims, and he hasn't forgotten the one who got away.""", editorial_review= '“Bestseller Roberts (Nightwork) gives readers another strong protagonist to root for in this otherwise rote standalone thriller.” —Publishers Weekly', publication_date= '04/23/2023', publisher= 'Bloomsbury USA', cover_art='https://m.media-amazon.com/images/I/91TCHkU6UrL._AC_UF1000,1000_QL80_.jpg', pages= 816)


  demo_book20 = Book(
    publisher_id = 3,  title="Oh, the Places You'll go", author= 'Dr. Seuss', price_paperback=12.00, price_hardcover=15.49, price_eBook=9.99, genre='Fiction', overview= """Dr. Seuss’s wonderfully wise Oh, the Places You’ll Go! is the perfect gift to celebrate all of our special milestones—from graduations to birthdays and beyond!

From soaring to high heights and seeing great sights to being left in a Lurch on a prickle-ly perch, Dr. Seuss addresses life’s ups and downs with his trademark humorous verse and whimsical illustrations.

The inspiring and timeless message encourages readers to find the success that lies within, no matter what challenges they face. A perennial favorite and a perfect gift for anyone starting a new phase in their life!""", editorial_review= '"[A] book that has proved to be popular for graduates of all ages since it was first published." —The New York Times', publication_date= '01/22/1990', publisher= "Random House Children's Books", cover_art='https://m.media-amazon.com/images/I/51opHU0nG8L.jpg', pages= 56)

  demo_book21 = Book(
    publisher_id = 3,  title='Lessons in Chemistry', author= 'Bonnie Garmus', price_paperback=23.99, price_hardcover=23.99, price_eBook=14.99, genre='Fiction', overview= """NEW YORK TIMES BESTSELLER • GOOD MORNING AMERICA BOOK CLUB PICK • A must-read debut! Meet Elizabeth Zott: a “formidable, unapologetic and inspiring” (PARADE) scientist in 1960s California whose career takes a detour when she becomes the unlikely star of a beloved TV cooking show in this novel that is “irresistible, satisfying and full of fuel. It reminds you that change takes time and always requires heat” (The New York Times Book Review).

"A unique heroine ... you'll find yourself wishing she wasn’t fictional." —Seattle Times

Chemist Elizabeth Zott is not your average woman. In fact, Elizabeth Zott would be the first to point out that there is no such thing as an average woman. But it’s the early 1960s and her all-male team at Hastings Research Institute takes a very unscientific view of equality. Except for one: Calvin Evans; the lonely, brilliant, Nobel–prize nominated grudge-holder who falls in love with—of all things—her mind. True chemistry results.

But like science, life is unpredictable. Which is why a few years later Elizabeth Zott finds herself not only a single mother, but the reluctant star of America’s most beloved cooking show Supper at Six. Elizabeth’s unusual approach to cooking (“combine one tablespoon acetic acid with a pinch of sodium chloride”) proves revolutionary. But as her following grows, not everyone is happy. Because as it turns out, Elizabeth Zott isn’t just teaching women to cook. She’s daring them to change the status quo.

Laugh-out-loud funny, shrewdly observant, and studded with a dazzling cast of supporting characters, Lessons in Chemistry is as original and vibrant as its protagonist.""", editorial_review= 'The author has a great voice, but contemporary readers will be left wondering who this is for. —Publishers Weekly', publication_date= '04/05/2022', publisher= 'Knopf Doubleday Publishing Group', cover_art='https://m.media-amazon.com/images/I/71yNgTMEcpL._AC_UF1000,1000_QL80_.jpg', pages= 400)

  demo_book22 = Book(
    publisher_id = 3,  title='Love, Theoretically', author= 'Ali Hazelwood', price_paperback=15.30, price_hardcover=23.99, price_eBook=14.99, genre='Fiction', overview= """The many lives of theoretical physicist Elsie Hannaway have finally caught up with her. By day, she’s an adjunct professor, toiling away at grading labs and teaching thermodynamics in the hopes of landing tenure. By other day, Elsie makes up for her non-existent paycheck by offering her services as a fake girlfriend, tapping into her expertly honed people-pleasing skills to embody whichever version of herself the client needs.

Honestly, it’s a pretty sweet gig—until her carefully constructed Elsie-verse comes crashing down. Because Jack Smith, the annoyingly attractive and arrogant older brother of her favorite client, turns out to be the cold-hearted experimental physicist who ruined her mentor’s career and undermined the reputation of theorists everywhere. And he’s the same Jack Smith who rules over the physics department at MIT, standing right between Elsie and her dream job.

Elsie is prepared for an all-out war of scholarly sabotage but…those long, penetrating looks? Not having to be anything other than her true self when she’s with him? Will falling into an experimentalist’s orbit finally tempt her to put her most guarded theories on love into practice?""", editorial_review= '“Gloriously nerdy and sexy, with on-point commentary about women in STEM.”—New York Times bestselling author Helen Hoang on Love on the Brain', publication_date= '06/13/2022', publisher= 'Penguin Publishing Group', cover_art='https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1666812990i/61326735.jpg', pages= 400)

  demo_book23 = Book(
    publisher_id = 3,  title='The Marriage Portrait', author= "Maggie O'Farrell", price_paperback=14.79, price_hardcover=24.99, price_eBook=14.99, genre='Fiction', overview= """REESE’S BOOK CLUB DECEMBER PICK • NEW YORK TIMES BEST SELLER • The author of award-winning Hamnet brings the world of Renaissance Italy to jewel-bright life in this unforgettable fictional portrait of the captivating young duchess Lucrezia de' Medici as she makes her way in a troubled court.

“I could not stop reading this incredible true story.” —Reese Witherspoon (Reese’s Book Club December ’22 Pick)

"O’Farrell pulls out little threads of historical detail to weave this story of a precocious girl sensitive to the contradictions of her station ... You may know the history, and you may think you know what’s coming, but don’t be so sure." —The Washington Post

Florence, the 1550s. Lucrezia, third daughter of the grand duke, is comfortable with her obscure place in the palazzo: free to wonder at its treasures, observe its clandestine workings, and devote herself to her own artistic pursuits. But when her older sister dies on the eve of her wedding to the ruler of Ferrara, Modena and Reggio, Lucrezia is thrust unwittingly into the limelight: the duke is quick to request her hand in marriage, and her father just as quick to accept on her behalf.

Having barely left girlhood behind, Lucrezia must now enter an unfamiliar court whose customs are opaque and where her arrival is not universally welcomed. Perhaps most mystifying of all is her new husband himself, Alfonso. Is he the playful sophisticate he appeared to be before their wedding, the aesthete happiest in the company of artists and musicians, or the ruthless politician before whom even his formidable sisters seem to tremble?

As Lucrezia sits in constricting finery for a painting intended to preserve her image for centuries to come, one thing becomes worryingly clear. In the court’s eyes, she has one duty: to provide the heir who will shore up the future of the Ferranese dynasty. Until then, for all of her rank and nobility, the new duchess’s future hangs entirely in the balance.

Full of the beauty and emotion with which she illuminated the Shakespearean canvas of Hamnet, Maggie O’Farrell turns her talents to Renaissance Italy in an extraordinary portrait of a resilient young woman’s battle for her very survival.""", editorial_review= '“Gloriously nerdy and sexy, with on-point commentary about women in STEM.”—New York Times bestselling author Helen Hoang on Love on the Brain', publication_date= '09/6/2022', publisher= 'Knopf Doubleday Publishing Group', cover_art='https://m.media-amazon.com/images/I/91SjtdfXdIL._AC_UF1000,1000_QL80_.jpg', pages= 352)

  demo_book24 = Book(
    publisher_id = 3,  title='Sea Change', author= 'Gina Chung', price_paperback=13.60, price_hardcover=23.99, price_eBook=11.99, genre='Fiction', overview= """A NEW YORK TIMES MOST ANTICIPATED BOOK • An enchanting novel about Ro, a woman tossed overboard by heartbreak and loss, who has to find her way back to stable shores with the help of a giant Pacific octopus at the mall aquarium where she works.

“Immersively beautiful.... A kaleidoscope of originality." —Weike Wang, acclaimed author of Joan is Okay

Ro is stuck. She's just entered her thirties, she's estranged from her mother, and her boyfriend has just left her to join a mission to Mars. Her days are spent dragging herself to her menial job at the aquarium, and her nights are spent drinking sharktinis (Mountain Dew and copious amounts of gin, plus a hint of jalapeño). With her best friend pulling away to focus on her upcoming wedding, Ro's only companion is Dolores, a giant Pacific octopus who also happens to be Ro's last remaining link to her father, a marine biologist who disappeared while on an expedition when Ro was a teenager.

When Dolores is sold to a wealthy investor intent on moving her to a private aquarium, Ro finds herself on the precipice of self-destruction. Wading through memories of her youth, Ro realizes she can either lose herself in the undertow of reminiscence, or finally come to terms with her childhood trauma, recommit to those around her, and find her place in an ever-changing world.""", editorial_review= '“Gloriously nerdy and sexy, with on-point commentary about women in STEM.”—New York Times bestselling author Helen Hoang on Love on the Brain', publication_date= '03/28/2023', publisher= 'Knopf Doubleday Publishing Group', cover_art='https://m.media-amazon.com/images/I/81sAOxbZLVL._AC_UF1000,1000_QL80_.jpg', pages= 288)

  db.session.add(demo_book)
  db.session.add(demo_book2)
  db.session.add(demo_book3)
  db.session.add(demo_book4)
  db.session.add(demo_book5)
  db.session.add(demo_book6)
  db.session.add(demo_book7)
  db.session.add(demo_book8)
  db.session.add(demo_book9)
  db.session.add(demo_book10)
  db.session.add(demo_book11)
  db.session.add(demo_book12)
  db.session.add(demo_book13)
  db.session.add(demo_book14)
  db.session.add(demo_book15)
  db.session.add(demo_book16)
  db.session.add(demo_book17)
  db.session.add(demo_book18)
  db.session.add(demo_book19)
  db.session.add(demo_book20)
  db.session.add(demo_book21)
  db.session.add(demo_book22)
  db.session.add(demo_book23)
  db.session.add(demo_book24)

  db.session.commit()



def undo_books():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM books")

  db.session.commit()
