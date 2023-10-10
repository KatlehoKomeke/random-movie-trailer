import { Auth } from "aws-amplify";
import { contentType, contentsType } from "../types/types";

export async function getContent(page: number):Promise<any>{
    debugger
    // const queryParam = '&page='+ page
    const response = await fetch('https://jph3t55dlnhmtcajibmagrymmq.appsync-api.eu-central-1.amazonaws.com/graphql',{
        method: 'POST',
        body: JSON.stringify({
            query:`query getContentByIdQuery{
                            getContentById(page:`+page+`){
                            }
                        }`
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'x-api-key':process.env.REACT_APP_appsync_api_key!
            'Authorization': (await Auth.currentAuthenticatedUser())?.getAccessToken().getJwtToken()
        }
    })
    const responseAsJson = await response.json()
    if(responseAsJson?.errors){
        throw new Error('error: ' + responseAsJson?.errors)
    }
    return await Promise<{
        page: 1,
        results: [
            {
            adult: false,
            backdrop_path: "/mRGmNnh6pBAGGp6fMBMwI8iTBUO.jpg",
            genre_ids: [
                27,
                9648,
                53
            ],
            id: 968051,
            original_language: "en",
            original_title: "The Nun II",
            overview: "In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate. She once again comes face-to-face with a powerful evil.",
            popularity: 5340.847,
            poster_path: "/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
            release_date: "2023-09-06",
            title: "The Nun II",
            video: false,
            vote_average: 7,
            vote_count: 653
            },
            {
            adult: false,
            backdrop_path: "/pA3vdhadJPxF5GA1uo8OPTiNQDT.jpg",
            genre_ids: [
                28,
                18
            ],
            id: 678512,
            original_language: "en",
            original_title: "Sound of Freedom",
            overview: "The story of Tim Ballard, a former US government agent, who quits his job in order to devote his life to rescuing children from global sex traffickers.",
            popularity: 3187.754,
            poster_path: "/qA5kPYZA7FkVvqcEfJRoOy4kpHg.jpg",
            release_date: "2023-07-03",
            title: "Sound of Freedom",
            video: false,
            vote_average: 8.1,
            vote_count: 710
            },
            {
            adult: false,
            backdrop_path: "/dWnABFqQN6Hu8eIIiFAMil7lUXO.jpg",
            genre_ids: [
                12,
                28,
                18
            ],
            id: 980489,
            original_language: "en",
            original_title: "Gran Turismo",
            overview: "The ultimate wish-fulfillment tale of a teenage Gran Turismo player whose gaming skills won him a series of Nissan competitions to become an actual professional racecar driver.",
            popularity: 2320.595,
            poster_path: "/51tqzRtKMMZEYUpSYkrUE7v9ehm.jpg",
            release_date: "2023-08-09",
            title: "Gran Turismo",
            video: false,
            vote_average: 8,
            vote_count: 882
            },
            {
            adult: false,
            backdrop_path: "/cHNqobjzfLj88lpIYqkZpecwQEC.jpg",
            genre_ids: [
                28,
                53,
                80
            ],
            id: 926393,
            original_language: "en",
            original_title: "The Equalizer 3",
            overview: "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.",
            popularity: 1919.275,
            poster_path: "/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg",
            release_date: "2023-08-30",
            title: "The Equalizer 3",
            video: false,
            vote_average: 7.2,
            vote_count: 499
            },
            {
            adult: false,
            backdrop_path: "/1syW9SNna38rSl9fnXwc9fP7POW.jpg",
            genre_ids: [
                28,
                878,
                12
            ],
            id: 565770,
            original_language: "en",
            original_title: "Blue Beetle",
            overview: "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
            popularity: 1886.418,
            poster_path: "/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
            release_date: "2023-08-16",
            title: "Blue Beetle",
            video: false,
            vote_average: 7.1,
            vote_count: 1181
            },
            {
            adult: false,
            backdrop_path: "/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg",
            genre_ids: [
                27,
                53
            ],
            id: 1008042,
            original_language: "en",
            original_title: "Talk to Me",
            overview: "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.",
            popularity: 1626.958,
            poster_path: "/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
            release_date: "2023-07-26",
            title: "Talk to Me",
            video: false,
            vote_average: 7.2,
            vote_count: 1096
            },
            {
            adult: false,
            backdrop_path: "/jkKVLzLWjSvTnc84VzeljhSy6j8.jpg",
            genre_ids: [
                10749,
                18
            ],
            id: 820525,
            original_language: "en",
            original_title: "After Everything",
            overview: "Besieged by writer’s block and the crushing breakup with Tessa, Hardin travels to Portugal in search of a woman he wronged in the past – and to find himself. Hoping to win back Tessa, he realizes he needs to change his ways before he can make the ultimate commitment.",
            popularity: 1586.218,
            poster_path: "/uQxjZGU6rxSPSMeAJPJQlmfV3ys.jpg",
            release_date: "2023-09-13",
            title: "After Everything",
            video: false,
            vote_average: 6.8,
            vote_count: 176
            },
            {
            adult: false,
            backdrop_path: "/8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg",
            genre_ids: [
                28,
                878,
                27
            ],
            id: 615656,
            original_language: "en",
            original_title: "Meg 2: The Trench",
            overview: "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
            popularity: 1393.801,
            poster_path: "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
            release_date: "2023-08-02",
            title: "Meg 2: The Trench",
            video: false,
            vote_average: 6.9,
            vote_count: 2159
            },
            {
            adult: false,
            backdrop_path: "/xvzxqKWltnj6qSiWBXRq6ZCdcrw.jpg",
            genre_ids: [
                53,
                18
            ],
            id: 1151534,
            original_language: "es",
            original_title: "Nowhere",
            overview: "A young pregnant woman named Mia escapes from a country at war by hiding in a maritime container aboard a cargo ship. After a violent storm, Mia gives birth to the child while lost at sea, where she must fight to survive.",
            popularity: 1072.718,
            poster_path: "/rpzFxv78UvYG5yQba2soO5mMl4T.jpg",
            release_date: "2023-09-29",
            title: "Nowhere",
            video: false,
            vote_average: 7.8,
            vote_count: 407
            },
            {
            adult: false,
            backdrop_path: "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
            genre_ids: [
                28,
                80,
                53
            ],
            id: 385687,
            original_language: "en",
            original_title: "Fast X",
            overview: "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
            popularity: 1040.065,
            poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
            release_date: "2023-05-17",
            title: "Fast X",
            video: false,
            vote_average: 7.3,
            vote_count: 3945
            },
            {
            adult: false,
            backdrop_path: "/1DBo2V4KyBWXuagt4JOR2jZJMHB.jpg",
            genre_ids: [
                28,
                53
            ],
            id: 1171541,
            original_language: "en",
            original_title: "Sniper: G.R.I.T. - Global Response & Intelligence Team",
            overview: "When an international terrorist cult threatens global political stability and kidnaps a fellow agent, Ace Sniper Brandon Beckett and the newly-formed Global Response & Intelligence Team – or G.R.I.T. – led by Colonel Stone must travel across the world to Malta, infiltrate the cult, and take out its leader to free Lady Death and stop the global threat.",
            popularity: 990.334,
            poster_path: "/gcd5TJwXLWeQ2Dn0aRxI8OJIIxK.jpg",
            release_date: "2023-09-26",
            title: "Sniper: G.R.I.T. - Global Response & Intelligence Team",
            video: false,
            vote_average: 7.5,
            vote_count: 24
            },
            {
            adult: false,
            backdrop_path: "/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
            genre_ids: [
                28,
                9648,
                53,
                80
            ],
            id: 762430,
            original_language: "en",
            original_title: "Retribution",
            overview: "When a mysterious caller puts a bomb under his car seat, Matt Turner begins a high-speed chase across the city to complete a specific series of tasks. With his kids trapped in the back seat and a bomb that will explode if they get out of the car, a normal commute becomes a twisted game of life or death as Matt follows the stranger's increasingly dangerous instructions in a race against time to save his family.",
            popularity: 966.454,
            poster_path: "/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg",
            release_date: "2023-08-23",
            title: "Retribution",
            video: false,
            vote_average: 6.8,
            vote_count: 297
            },
            {
            adult: false,
            backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
            genre_ids: [
                35,
                12,
                14
            ],
            id: 346698,
            original_language: "en",
            original_title: "Barbie",
            overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
            popularity: 948.096,
            poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
            release_date: "2023-07-19",
            title: "Barbie",
            video: false,
            vote_average: 7.3,
            vote_count: 5255
            },
            {
            adult: false,
            backdrop_path: "/eSsMzJpzAwCa69tm6Wco2il44aJ.jpg",
            genre_ids: [
                28,
                80,
                18,
                53
            ],
            id: 939335,
            original_language: "en",
            original_title: "Muzzle",
            overview: "LAPD K-9 officer Jake Rosser has just witnessed the shocking murder of his dedicated partner by a mysterious assailant. As he investigates the shooter’s identity, he uncovers a vast conspiracy that has a chokehold on the city in this thrilling journey through the tangled streets of Los Angeles and the corrupt bureaucracy of the LAPD.",
            popularity: 924.469,
            poster_path: "/9GiUF4AsXrWRGEZMjaiaGTlqx3R.jpg",
            release_date: "2023-09-29",
            title: "Muzzle",
            video: false,
            vote_average: 6.3,
            vote_count: 17
            },
            {
            adult: false,
            backdrop_path: "/4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg",
            genre_ids: [
                16,
                35,
                10751,
                14,
                10749
            ],
            id: 976573,
            original_language: "en",
            original_title: "Elemental",
            overview: "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
            popularity: 859.864,
            poster_path: "/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg",
            release_date: "2023-06-14",
            title: "Elemental",
            video: false,
            vote_average: 7.8,
            vote_count: 2548
            },
            {
            adult: false,
            backdrop_path: "/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg",
            genre_ids: [
                80,
                27,
                53
            ],
            id: 951491,
            original_language: "en",
            original_title: "Saw X",
            overview: "Between the events of 'Saw' and 'Saw II', a sick and desperate John Kramer travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer, only to discover the entire operation is a scam to defraud the most vulnerable. Armed with a newfound purpose, the infamous serial killer returns to his work, turning the tables on the con artists in his signature visceral way through devious, deranged, and ingenious traps.",
            popularity: 763.929,
            poster_path: "/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
            release_date: "2023-09-26",
            title: "Saw X",
            video: false,
            vote_average: 7.2,
            vote_count: 106
            },
            {
            adult: false,
            backdrop_path: "/f33XdT6dwNXmXQNvQ4FuyhQrUob.jpg",
            genre_ids: [
                27
            ],
            id: 807172,
            original_language: "en",
            original_title: "The Exorcist: Believer",
            overview: "When his daughter, Angela, and her friend Katherine, show signs of demonic possession, it unleashes a chain of events that forces single father Victor Fielding to confront the nadir of evil. Terrified and desperate, he seeks out Chris MacNeil, the only person alive who's witnessed anything like it before.",
            popularity: 698.548,
            poster_path: "/lxRLC3WOFM2INoyEa3bFGIUApvn.jpg",
            release_date: "2023-10-04",
            title: "The Exorcist: Believer",
            video: false,
            vote_average: 5.2,
            vote_count: 29
            },
            {
            adult: false,
            backdrop_path: "/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
            genre_ids: [
                28,
                12,
                878
            ],
            id: 667538,
            original_language: "en",
            original_title: "Transformers: Rise of the Beasts",
            overview: "When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction known as the Maximals. With the fate of humanity hanging in the balance, humans Noah and Elena will do whatever it takes to help the Transformers as they engage in the ultimate battle to save Earth.",
            popularity: 696.045,
            poster_path: "/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
            release_date: "2023-06-06",
            title: "Transformers: Rise of the Beasts",
            video: false,
            vote_average: 7.5,
            vote_count: 3318
            },
            {
            adult: false,
            backdrop_path: "/zYlgqIpqJ1VAbvFhRhktAzIybVs.jpg",
            genre_ids: [
                27,
                878,
                53
            ],
            id: 820609,
            original_language: "en",
            original_title: "No One Will Save You",
            overview: "An exiled anxiety-ridden homebody must battle an alien who's found its way into her home.",
            popularity: 668.293,
            poster_path: "/ehGIDAMaYy6Eg0o8ga0oqflDjqW.jpg",
            release_date: "2023-09-22",
            title: "No One Will Save You",
            video: false,
            vote_average: 6.9,
            vote_count: 469
            },
            {
            adult: false,
            backdrop_path: "/iOJX54nVAsnPawagFiWXKv1Y6sB.jpg",
            genre_ids: [
                16,
                12,
                10751
            ],
            id: 1076364,
            original_language: "en",
            original_title: "Carl's Date",
            overview: "Carl Fredricksen reluctantly agrees to go on a date with a lady friend—but admittedly has no idea how dating works these days. Ever the helpful friend, Dug steps in to calm Carl's pre-date jitters and offer some tried-and-true tips for making friends—if you're a dog.",
            popularity: 654.02,
            poster_path: "/y8NtM6q3PzntqyNRNw6wgicwRYl.jpg",
            release_date: "2023-06-15",
            title: "Carl's Date",
            video: false,
            vote_average: 7.8,
            vote_count: 216
            }
        ],
        total_pages: 40406,
        total_results: 808106
    }>
}

export async function getContentById(id: string):Promise<contentType>{
    debugger
    const response = await fetch('https://jph3t55dlnhmtcajibmagrymmq.appsync-api.eu-central-1.amazonaws.com/graphql',{
        method: 'POST',
        body: JSON.stringify({
            query:`query getContentByIdQuery{
                            getContentById(id:`+parseInt(id)+`){
                                link
                                title
                            }
                        }`
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'x-api-key':process.env.REACT_APP_appsync_api_key!
            'Authorization': (await Auth.currentAuthenticatedUser())?.getAccessToken().getJwtToken()
        }
    })
    const responseAsJson = await response.json()
    if(responseAsJson?.errors){
        throw new Error('error: ' + responseAsJson?.errors)
    }
    return {title:responseAsJson.data.getContentById.title,link:"https://www.youtube.com/embed/"+responseAsJson.data.getContentById.link}
}