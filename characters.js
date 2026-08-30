const characterData = {
    wilma: {
        name: "Wilma Hezemans",
        age: 58,
        height: "181.6cm",
        baseWeight: "79.4 kg",
        ability: "\"On your turn you may look at the top 3 tiles and replace in any order. Your tile hand is permanently increased by 1.\"",
        icon: "fa-user-ninja",
        tracks: {
            food: {
                max: 10,
                // These represent the block number that triggers an icon BEFORE it.
                // i.e., passing into 4, 7, and 9 incurs a weight penalty.
                barriers: [4, 7, 9] 
            },
            oxygen: {
                max: 7,
                barriers: [3, 4, 5, 6, 7]
            },
            weight: {
                max: 7,
                // Reaching weight 3, 5, and 7 drops your speed.
                barriers: [3, 5, 7]
            },
            health: {
                max: 10,
                // Dropping to 7, 4, and 1 drops your speed.
                barriers: [7, 4, 1]
            },
            speed: {
                max: 6
            }
        }
    },
    joseph: {
        name: "Joseph IV",
        age: 33,
        height: "170cm",
        baseWeight: "68 kg",
        ability: "\"On your turn you may consume [food] to gain [x2 health]. You may stop players from affecting your [food]\"",
        icon: "fa-user-ninja",
        tracks: {
            food: {
                max: 12,
                // These represent the block number that triggers an icon BEFORE it.
                // i.e., passing into 4, 7, and 9 incurs a weight penalty.
                barriers: [6, 10] 
            },
            oxygen: {
                max: 5,
                barriers: [2, 3, 4, 5]
            },
            weight: {
                max: 6,
                // Reaching weight 3, 5, and 7 drops your speed.
                barriers: [3, 5]
            },
            health: {
                max: 10,
                // Dropping to 7, 4, and 1 drops your speed.
                barriers: [8, 6, 3, 2]
            },
            speed: {
                max: 6
            }
        }
    },
    connor: {
        name: "Connor McKinnon",
        age: 15,
        height: "160cm",
        baseWeight: "45.4 kg",
        ability: "\"On your turn you may use one less [food] tha your weather die roll. You may stop players from affecting your tile hand.\"",
        icon: "fa-user-ninja",
        tracks: {
            food: {
                max: 8,
                // These represent the block number that triggers an icon BEFORE it.
                // i.e., passing into 4, 7, and 9 incurs a weight penalty.
                barriers: [3, 5, 7] 
            },
            oxygen: {
                max: 6,
                barriers: [2, 3, 4, 5]
            },
            weight: {
                max: 7,
                // Reaching weight 3, 5, and 7 drops your speed.
                barriers: [3, 5, 6]
            },
            health: {
                max: 10,
                // Dropping to 7, 4, and 1 drops your speed.
                barriers: [7, 4, 2]
            },
            speed: {
                max: 6
            }
        }
};

