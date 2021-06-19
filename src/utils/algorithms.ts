import {bunnyConsole, wait} from "./utils";
import {BinaryTreeNode, OrderType, TreeNode} from "../types";
import {DeepProxy} from '@qiwi/deep-proxy'
import {TProxyHandler} from "@qiwi/deep-proxy/typings/interface";
import {Queue, SinglyLinkedListNode, Stack} from "./data-structures";

export const runAlgorithm = async (algorithm: Function, ...args: any) => {
    const startTime = new Date().getTime();
    const result = await algorithm(...args);
    const timeSpent = new Date().getTime() - startTime;
    bunnyConsole.log(algorithm.name, 'result -> ', result, 'time spent -> ', timeSpent + 'ms');
}

export const treeData: TreeNode<number> = new TreeNode('1', '1', 0, [
    new TreeNode('1-1', '2', 0, [
            new TreeNode('1-1-1', '3', 0, [
                    new TreeNode('1-1-1-1', '4'),
                    new TreeNode('1-1-1-2', '5', 0, []
                    )
                ]
            ),
            new TreeNode('1-1-2', '4', 0, [
                    new TreeNode('1-1-2-1', '6'),
                    new TreeNode('1-1-2-2', '7')
                ]
            )
        ]
    ),
    new TreeNode('1-2', '8', 0, [
            new TreeNode('1-2-1', '9', 0, [
                    new TreeNode('1-2-1-1', '10'),
                    new TreeNode('1-2-1-2', '11')
                ]
            ),
            new TreeNode('1-2-2', '12', 0, [
                    new TreeNode('1-2-2-1', '13'),
                    new TreeNode('1-2-2-2', '14', 0, [
                            new TreeNode('1-2-2-2-1', '15')
                        ]
                    )
                ]
            )
        ]
    )
])

/* --- start tree --- */


// 94 Binary Tree Inorder Traversal	★ 144 145 429 589 590 987 1302 traversal
export async function binaryTreeInorderTraversal(root: BinaryTreeNode | null, proxyHandler: TProxyHandler): Promise<number[]> {
    type Variables = {
        node: BinaryTreeNode | null
    }

    let proxyVariables = new DeepProxy<Variables>({node: null}, proxyHandler);

    if (!root) {
        return []
    }

    const leftResult = await binaryTreeInorderTraversal(root.left, proxyHandler);

    proxyVariables.node = root.left;

    proxyVariables.node = root;

    const rightResult = await binaryTreeInorderTraversal(root.right, proxyHandler);
    proxyVariables.node = root.right;

    await wait(500);

    return [
        ...leftResult,
        root.val,
        ...rightResult
    ]
}

export const DFS = async (node: TreeNode<number>, type: OrderType, proxyHandler: TProxyHandler) => {
    type Variables = { current: TreeNode<number>, nodeNeedPrint: TreeNode<number> | undefined }

    let variablesProxy = new DeepProxy<Variables>({
        current: node,
        nodeNeedPrint: node
    }, proxyHandler);

    if (!variablesProxy.current) {
        return;
    }

    const {children} = variablesProxy.current;
    if (children && children.length > 0) {
        const left = children[0];
        const right = children[1];
        switch (type) {
            case 'InOrder':
                await DFS(left, type, proxyHandler);
                // console.log(node.id);
                variablesProxy.nodeNeedPrint = node;
                await wait(500)

                await DFS(right, type, proxyHandler);
                break;
            case 'PreOrder':
                // console.log(node.id);
                variablesProxy.nodeNeedPrint = node;
                await wait(500)

                await DFS(left, type, proxyHandler);
                await DFS(right, type, proxyHandler);
                break;
            case 'PostOrder':
                await DFS(left, type, proxyHandler);
                await DFS(right, type, proxyHandler);
                // console.log(node.id);
                variablesProxy.nodeNeedPrint = node;
                await wait(500)

                break;
        }
    }
}

// 102	Binary Tree Level Order Traversal	★★	107	429	872			collecting nodes
export const BFS = async (node: TreeNode<number>, proxyHandler: TProxyHandler) => {
    type Variables = { node: TreeNode<number> }

    let nodes: TreeNode<number>[] = [];

    let variablesProxy = new DeepProxy<Variables>({node: node,}, proxyHandler);

    if (node) {
        let queue = new Queue<TreeNode<number>>();
        queue.enqueue(node);
        while (!queue.isEmpty()) {
            let item = queue.dequeue() as TreeNode<number>;
            nodes.push(item);
            variablesProxy.node = item;
            await wait(500);
            const {children} = item;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    queue.enqueue(children[i]);
                }
            }
        }
    }
    return nodes;
}

/* --- start Search (BFS/DFS) ---*/

// 17	Letter Combinations of a Phone Number	★★	39	40	77	78	90	216
export async function letterCombinations(digits: string, proxyHandler: TProxyHandler): Promise<string[]> {
    // corner case
    if (digits.length === 0) return [];

    type PhoneKeys = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

    let proxyVariables = new DeepProxy<{ accumulated: string, result: string[] }>({accumulated: '', result: []}, proxyHandler)

    const digitsMap: { [key in PhoneKeys]: string } = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    const dfs = async (level: number, accumulated: Stack<string>) => {
        // base case
        if (digits.length === level) {
            proxyVariables.result.push(accumulated.toArray().join('').toString());
            return;
        }

        for (const char of digitsMap[digits[level] as PhoneKeys]) {
            // recursive rule
            accumulated.push(char);
            await dfs(level + 1, accumulated);
            await wait(500);
            accumulated.pop();
        }
    }

    await dfs(0, new Stack<string>());

    return proxyVariables.result;
}


// 46	Permutations	★★	47	784	943	996				Permutation
const permute = function <T>(nums: T[]) {
    if (nums.length === 1) {
        return [nums];
    }

    let result: T[][] = [];

    const dfs = (accumulated: T[], rest: T[]) => {
        if (accumulated.length === nums.length) {
            result.push([...accumulated]);
            return;
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            accumulated.push(rest[i]);
            const restBacktrack = [...rest];
            rest.splice(i, 1); // delete ith element to generate rest,then pass in next recursion
            dfs(accumulated, rest);
            rest = restBacktrack;
            accumulated.pop();
        }
    }

    dfs([], [...nums]);

    return result;
};

const permuteMN = function <T>(nums: T[], n: number, excludeSelf: boolean = true) {
    if (n > nums.length) {
        return [];
    }
    if (nums.length === 1 && n === 1) {
        return [nums];
    }

    let result: T[][] = [];

    const dfs = (accumulated: T[], rest: T[], level: number) => {
        if (level === n) {
            result.push([...accumulated]);
            return;
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            accumulated.push(rest[i]);

            let restBackTrack: T[] = [];
            if (excludeSelf) {
                restBackTrack = [...rest];
                rest.splice(i, 1);
            }

            dfs(accumulated, rest, level + 1);

            accumulated.pop();
            if (excludeSelf) {
                rest = restBackTrack;
            }
        }
    }
    dfs([], nums, 0);
    return result;
};


// Combination
const combineMN = function <T>(nums: T[], n: number, excludeSelf: boolean = true) {
    if (n > nums.length) {
        return [];
    }
    if (nums.length === 1 && n === 1) {
        return [nums];
    }

    let result: T[][] = [];
    let hash: { [key in string]: 'exist' } = {};
    const dfs = (accumulated: T[], rest: T[], level: number) => {
        if (level === n) {
            const key = [...accumulated].sort().join('');
            if (!hash[key]) {
                hash[key] = 'exist';
                result.push([...accumulated]);
            }
            return;
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            accumulated.push(rest[i]);

            let restBackTrack: T[] = [];
            if (excludeSelf) {
                restBackTrack = [...rest];
                rest.splice(i, 1);
            }

            dfs(accumulated, rest, level + 1);
            accumulated.pop();

            if (excludeSelf) {
                rest = restBackTrack;
            }
        }
    }
    dfs([], nums, 0);
    return result;
};

// console.log(combineMN(['(','(',')',')'], 4, false))

// 22	Generate Parentheses	★★★	301							DFS
function generateParenthesis(n: number): string[] {
    // corner case
    if (n === 1) {
        return ['()']
    }

    let result: string[] = [];

    let openCount = 0, closeCount = 0;

    const dfs = (accumulated: string, level: number) => {
        // base case
        if (level === 2 * n) {
            result.push(accumulated);
            return;
        }

        // recursion rule
        if (openCount < n) {
            accumulated += '(';
            openCount++;
            dfs(accumulated, level + 1);
            openCount--;
            accumulated = accumulated.substr(0, accumulated.length - 1);
        }

        if (level != 0) {
            if (openCount > closeCount) {
                accumulated += ')';
                closeCount++;
                dfs(accumulated, level + 1);
                closeCount--;
                accumulated = accumulated.substr(0, accumulated.length - 1);
            }
        }
    }

    dfs('', 0);

    return result;
}

// 37	Sudoku Solver	★★★	51	52						DFS
// 79	Word Search	★★★	212							DFS
// 127	Word Ladder	★★★★	126	752	818					BFS
export const isOneDiffOrdered = (wordA: string, wordB: string) => {
    let diffCount = 0;
    for (let i = 0, len = wordA.length; i < len; i++) {
        if (wordA[i] !== wordB[i]) {
            diffCount++;
            if (diffCount > 1) {
                return false;
            }
        }
    }
    return true;
}

export const isOneDiff = (word1: string, word2: string) => {
    let diffCount = 0;
    for (let c1 of word1) {
        if (!word2.includes(c1)) {
            diffCount++;
            if (diffCount > 1) {
                return false;
            }
        }
    }
    diffCount = 0;
    for (let c2 of word2) {
        if (!word1.includes(c2)) {
            diffCount++;
            if (diffCount > 1) {
                return false;
            }
        }
    }
    return true;
}

export function ladderLengthDFS(beginWord: string, endWord: string, wordList: string[], proxyHandler: TProxyHandler): number {

    let proxyVariables = new DeepProxy<{ tree: TreeNode<string> }>({tree: new TreeNode(beginWord, beginWord, beginWord)}, proxyHandler)

    const wordListLength = wordList.length;
    // corner case
    if (wordListLength < 1) {
        return 0;
    }
    if (!wordList.includes(endWord)) {
        return 0;
    }

    let shortest = 0;

    const dfs = (accumulated: string[], rest: string[], level: number, parentNode: TreeNode<string>) => {
        // base case
        if (accumulated[accumulated.length - 1] === endWord) {
            if (shortest === 0 || accumulated.length < shortest) {
                shortest = accumulated.length;
            }
            return;
        }

        if (level === wordListLength) {
            return;
        }

        if (level === 0) {
            accumulated.push(beginWord);
        }

        for (let i = 0, len = rest.length; i < len; i++) {
            if (isOneDiffOrdered(rest[i], accumulated[accumulated.length - 1])) {
                accumulated.push(rest[i]);
                let newNode = new TreeNode(accumulated.join(), accumulated.join(), accumulated.join());
                parentNode.addChildren(newNode);
                const backTrackRest = [...rest];
                rest.splice(i, 1);
                dfs(accumulated, rest, level + 1, newNode);
                accumulated.pop();
                rest = backTrackRest;
            }
        }
    }

    dfs([], wordList, 0, proxyVariables.tree);

    return shortest;
}

// Plagiarized 3440 ms
export const ladderLengthPlagiarized = function (beginWord: string, endWord: string, wordList: string[], proxyHandler: TProxyHandler) {
    let queue = [beginWord]
    let level = 1
    if (!wordList.includes(endWord)) {
        return 0
    }
    let map: { [key in string]: boolean } = {}
    while (queue.length) {
        let diffByOne = []
        while (queue.length) {
            // console.log(queue)
            let ele = queue.shift()
            map[ele!] = true
            let eleChar = ele!.split('')
            for (let i = 0; i < wordList.length; i++) {
                let count = 0
                let wordChar = wordList[i].split('')
                for (let j = 0; j < eleChar.length; j++) {
                    if (wordChar[j] !== eleChar[j]) {
                        count++
                        if (count == 2) {
                            break
                        }
                    }
                }
                if (count == 1) {
                    if (wordList[i] == endWord) {
                        return level + 1
                    }
                    if (!map[wordList[i]]) {
                        diffByOne.push(wordList[i])
                        map[wordList[i]] = true
                    }
                }
            }
        }
        if (diffByOne.length) {
            queue = [...queue, ...diffByOne]
        }
        level++
    }
    return 0
};

export const ladderLengthBFS = function (beginWord: string, endWord: string, wordList: string[]) {
    if (wordList.length < 1 || !wordList.includes(endWord)) {
        return 0;
    }

    const wordListSet = new Set();

    // let queue = new Queue<string>();
    let queue: string[] = [];
    // queue.add(beginWord);
    queue.unshift(beginWord);
    let level = 1;
    // let tempQueue = new Queue<string>();
    let tempQueue: string[] = [];
    // while (!queue.isEmpty()) {
    while (queue.length > 0) {
        const top = queue.pop();

        for (let word of wordList) {
            if (isOneDiffOrdered(word, top!) && !wordListSet.has(word)) {
                if (word === endWord) {
                    return level + 1;
                }
                wordListSet.add(word);
                // tempQueue.add(newWord);
                tempQueue.unshift(word);
            }
        }

        // if(queue.isEmpty()){
        if (queue.length < 1) {
            // queue.concat(tempQueue);
            queue = [...queue, ...tempQueue];
            // tempQueue.clear();
            tempQueue = [];
            level++;
        }
    }
    return 0;
}
// runAlgorithm(ladderLengthBFS, "hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]).then()
// runAlgorithm(ladderLengthBFS, "qa","sq",["si","go","se","cm","so","ph","mt","db","mb","sb","kr","ln","tm","le","ti","ba","to","ra","fa","yo","ow","sn","ya","cr","po","he","lr","sq","ye"]).then()
runAlgorithm(ladderLengthBFS, "catch", "choir", ["tours", "awake", "goats", "crape", "boron", "payee", "waken", "cares", "times", "piled", "maces", "cuter", "spied", "spare", "mouse", "minty", "theed", "sprat", "veins", "brian", "crown", "years", "drone", "froth", "foggy", "laura", "sears", "shunt", "gaunt", "hovel", "staff", "child", "arson", "haber", "knows", "rubes", "czars", "pawed", "whine", "treed", "bauer", "jodie", "timed", "flits", "robby", "gooks", "yawls", "purse", "veeps", "tints", "taped", "raced", "shaft", "modes", "dykes", "slims", "parts", "emile", "frail", "salem", "jives", "heave", "bayer", "leech", "clipt", "yanks", "wilds", "hikes", "cilia", "spiel", "mulls", "fetal", "homed", "drown", "suite", "defer", "oaken", "flail", "zippy", "burke", "slued", "mowed", "manes", "verse", "serra", "bruno", "spoke", "mikes", "hafts", "breed", "sully", "croce", "boers", "chair", "thong", "pulse", "pasta", "perot", "fices", "shies", "nadir", "every", "diets", "roads", "cones", "tuned", "globs", "graft", "stall", "royal", "fixes", "north", "pikes", "slack", "vests", "quart", "crawl", "tangs", "calks", "mayor", "filmy", "barns", "block", "hoods", "storm", "cedes", "emote", "tacks", "skirt", "horsy", "mawed", "moray", "wring", "munch", "hewed", "hooke", "batch", "drawl", "berth", "sport", "welch", "jeans", "river", "tabby", "amens", "stump", "cause", "maced", "hiker", "spays", "dusty", "trail", "acorn", "zooms", "puked", "clown", "sands", "kelli", "stein", "rawer", "water", "dolts", "momma", "fluky", "scots", "pupil", "halls", "toady", "pored", "latch", "shags", "union", "tamps", "stead", "ryder", "knoll", "cacao", "damns", "charm", "frank", "draws", "gowns", "risen", "saxes", "lucks", "avert", "yolks", "clime", "wedge", "ruses", "famed", "sabik", "gravy", "anion", "veils", "pyres", "raspy", "lofts", "tress", "showy", "percy", "rices", "taker", "roger", "yeats", "baked", "ayers", "fazes", "curly", "shawn", "clare", "paine", "ranks", "hocks", "berta", "plays", "parks", "tacos", "onion", "skeet", "acton", "lamer", "teals", "reset", "steal", "maven", "sored", "fecal", "harsh", "totem", "swoop", "rough", "jokes", "mires", "weird", "quits", "damps", "touts", "fling", "sarah", "peeps", "waxen", "traps", "mange", "swell", "swoon", "catch", "mower", "bonny", "finds", "yards", "pleas", "filed", "smelt", "drams", "vivid", "smirk", "whigs", "loafs", "opens", "meter", "hakes", "berms", "whack", "donny", "faint", "peace", "libby", "yates", "purer", "wants", "brace", "razed", "emend", "bards", "karyn", "japed", "fated", "missy", "punks", "humps", "steak", "depth", "brunt", "hauls", "craws", "blast", "broom", "tones", "ousts", "wires", "peeks", "ruffs", "crack", "monte", "worth", "spans", "tonic", "runny", "erick", "singe", "maine", "casts", "jello", "realm", "haste", "utter", "bleat", "kasey", "palms", "solos", "hoagy", "sweep", "loner", "naves", "rhine", "acmes", "cadet", "dices", "saris", "mauro", "fifty", "prows", "karat", "dowel", "frays", "shorn", "sails", "ticks", "train", "stars", "stork", "halts", "basal", "glops", "beset", "rifer", "layla", "lathe", "daffy", "jinns", "snide", "groin", "kelly", "zincs", "fryer", "quilt", "drama", "shook", "swami", "hulls", "swazi", "danes", "axons", "those", "lorry", "plath", "prime", "faces", "crock", "shake", "borer", "droop", "derek", "shirk", "styed", "frown", "jells", "slows", "lifts", "jeers", "helms", "turds", "dross", "tired", "rimes", "beats", "dingo", "crews", "bides", "loins", "furry", "shana", "wises", "logos", "aural", "light", "pings", "belch", "campy", "swish", "sangs", "nerds", "boggy", "skies", "weals", "snags", "joyed", "mamet", "miser", "leaks", "ramos", "tract", "rends", "marks", "taunt", "sissy", "lipid", "beach", "coves", "fates", "grate", "gloss", "heros", "sniff", "verve", "tells", "bulge", "grids", "skein", "clout", "leaps", "males", "surfs", "slips", "grave", "boats", "tamed", "muled", "meier", "lower", "leafy", "stool", "reich", "rider", "iring", "ginny", "flaks", "chirp", "tonga", "chest", "ollie", "foxes", "links", "alton", "darth", "drier", "sated", "rails", "gyros", "green", "jenna", "cures", "veals", "sense", "sworn", "roses", "aides", "loses", "rival", "david", "worms", "stand", "track", "dales", "noyes", "fraud", "shock", "sward", "pluto", "biked", "roans", "whiny", "halve", "bunts", "spilt", "gamey", "deeds", "oozed", "ruder", "drano", "sages", "fewer", "maize", "aimed", "bails", "poole", "hunts", "shari", "champ", "shuns", "jonah", "faced", "spook", "harry", "lagos", "peale", "nacho", "saint", "power", "chaff", "shard", "cocky", "irate", "tummy", "withe", "forks", "bates", "stuns", "turfs", "coped", "coups", "vince", "helps", "facet", "fezes", "outer", "cheek", "tried", "sumps", "fakes", "fonds", "yearn", "brays", "flute", "fetid", "beyer", "mamma", "topic", "bouts", "trend", "gorey", "hills", "swaps", "sexes", "cindy", "ruler", "kited", "gaits", "shank", "cloys", "stuck", "purus", "musks", "gouge", "brake", "biker", "layer", "lilly", "bills", "seven", "flyer", "phase", "wowed", "beaus", "cokes", "chimp", "spats", "mooch", "dried", "hulks", "shift", "galen", "wiped", "clops", "decal", "nopes", "huffs", "lades", "sunny", "foyer", "gusty", "wormy", "chips", "focus", "pails", "solid", "ariel", "gamed", "diver", "vying", "sacks", "spout", "sides", "agave", "bandy", "scant", "coils", "marci", "marne", "swank", "basil", "shine", "nines", "clues", "fuzes", "jacks", "robin", "pyxes", "later", "silas", "napes", "homes", "baled", "dames", "abuse", "piker", "coots", "tiles", "bents", "pearl", "booty", "hells", "dusky", "glare", "scale", "pales", "leary", "scull", "bimbo", "mossy", "apron", "manet", "opted", "kusch", "shiny", "argos", "hoped", "towns", "bilbo", "slums", "skull", "shale", "mandy", "scows", "speed", "eager", "lards", "crows", "merry", "anted", "faxed", "leave", "fargo", "creek", "comas", "golda", "baize", "easts", "plied", "rared", "ashed", "doted", "bunin", "bonds", "yarns", "latin", "right", "worst", "sixes", "gabby", "begun", "upend", "giant", "tykes", "creak", "manor", "bosom", "riced", "dimly", "holes", "stunt", "parsi", "peers", "snell", "mates", "jules", "rusty", "myles", "yules", "sades", "hobbs", "booth", "clean", "liven", "gamer", "howdy", "stray", "riser", "wisps", "lubes", "tubes", "rodeo", "bigot", "tromp", "pimps", "reeve", "pumps", "dined", "still", "terms", "hines", "purrs", "roast", "dooms", "lints", "sells", "swims", "happy", "spank", "inset", "meany", "bobby", "works", "place", "brook", "haded", "chide", "slime", "clair", "zeros", "britt", "screw", "ducal", "wroth", "edger", "basie", "benin", "unset", "shade", "doers", "plank", "betsy", "bryce", "cross", "roped", "weans", "bliss", "moist", "corps", "clara", "notch", "sheep", "weepy", "bract", "diced", "carla", "locks", "sawed", "covey", "jocks", "large", "pasts", "bumps", "stile", "stole", "slung", "mooed", "souls", "dupes", "fairs", "lined", "tunis", "spelt", "joked", "wacky", "moira", "strut", "soled", "pints", "axing", "drank", "weary", "coifs", "wills", "gibes", "ceded", "gerry", "tires", "crazy", "tying", "sites", "trust", "dover", "bolds", "tools", "latex", "capet", "lanky", "grins", "brood", "hitch", "perts", "dozes", "keels", "vault", "laius", "chung", "deres", "glove", "corms", "wafer", "coons", "ponce", "tumid", "spinx", "verge", "soggy", "fleas", "middy", "saiph", "payer", "nukes", "click", "limps", "oared", "white", "chart", "nasty", "perth", "paddy", "elisa", "owing", "gifts", "manna", "ofter", "paley", "fores", "sough", "wanda", "doggy", "antic", "ester", "swath", "spoon", "lamas", "meuse", "hotel", "weedy", "quads", "paled", "blond", "flume", "pried", "rates", "petal", "rover", "marsh", "grief", "downy", "pools", "buffs", "dunne", "cruel", "finny", "cosby", "patch", "polly", "jerks", "linen", "cider", "visas", "beard", "mewed", "spill", "trots", "tares", "pured", "prior", "build", "throe", "wends", "baned", "mario", "misty", "golds", "lacey", "slags", "jived", "finis", "inner", "money", "skews", "sunks", "fined", "bauds", "lapel", "class", "berne", "rabin", "roils", "hyped", "styes", "evans", "towed", "hawed", "allow", "modal", "ports", "erich", "rills", "humid", "hooks", "sedge", "shirt", "nippy", "fundy", "runes", "smile", "dolly", "tisha", "byers", "goths", "sousa", "mimed", "welts", "hoots", "shown", "winds", "drays", "slams", "susan", "frogs", "peach", "goody", "boned", "chewy", "eliza", "peary", "pyxed", "tiled", "homer", "tokes", "verdi", "mabel", "rolls", "laden", "loxed", "phony", "woods", "brine", "rooks", "moods", "hired", "sises", "close", "slops", "tined", "creel", "hindu", "gongs", "wanes", "drips", "belly", "leger", "demon", "sills", "chevy", "brads", "drawn", "donna", "glean", "dying", "sassy", "gives", "hazes", "cores", "kayla", "hurst", "wheat", "wiled", "vibes", "kerry", "spiny", "wears", "rants", "sizer", "asses", "duked", "spews", "aired", "merak", "lousy", "spurt", "reeds", "dared", "paged", "prong", "deere", "clogs", "brier", "becks", "taken", "boxes", "wanna", "corny", "races", "spuds", "jowls", "mucks", "milch", "weest", "slick", "nouns", "alley", "bight", "paper", "lamps", "trace", "types", "sloop", "devon", "pedal", "glint", "gawky", "eaves", "herbs", "felts", "fills", "naval", "icing", "eking", "lauds", "stats", "kills", "vends", "capes", "chary", "belle", "moats", "fonts", "teems", "wards", "bated", "fleet", "renal", "sleds", "gases", "loony", "paced", "holst", "seeds", "curie", "joist", "swill", "seats", "lynda", "tasks", "colts", "shops", "toted", "nuder", "sachs", "warts", "pupal", "scalp", "heirs", "wilma", "pansy", "berra", "keeps", "menus", "grams", "loots", "heels", "caste", "hypes", "start", "snout", "nixes", "nests", "grand", "tines", "vista", "copes", "ellis", "narks", "feint", "lajos", "brady", "barry", "trips", "forth", "sales", "bests", "hears", "twain", "plaid", "hated", "kraft", "fared", "cubit", "jayne", "heats", "chums", "pangs", "glows", "lopez", "vesta", "garbo", "ethel", "blood", "roams", "mealy", "clunk", "rowed", "hacks", "davit", "plane", "fuses", "clung", "fitch", "serer", "wives", "lully", "clans", "kinks", "spots", "nooks", "plate", "knits", "greet", "loads", "manic", "scone", "darin", "pills", "earth", "gored", "socks", "fauna", "ditch", "wakes", "savvy", "quiet", "nulls", "sizes", "diana", "mayan", "velds", "dines", "punch", "bales", "sykes", "spiky", "hover", "teats", "lusts", "ricky", "think", "culls", "bribe", "pairs", "month", "cored", "packs", "lobes", "older", "hefts", "faxes", "cased", "swain", "bawdy", "troop", "woven", "stomp", "swags", "beads", "check", "shill", "broad", "souse", "pouch", "lived", "iambs", "teaks", "clams", "outed", "maxed", "plain", "sappy", "cabal", "penal", "shame", "budge", "offed", "kooks", "gybed", "basin", "thoth", "arced", "hypos", "flows", "fetch", "needs", "davis", "jared", "bongo", "added", "sames", "randy", "tunes", "jamar", "smash", "blows", "grows", "palmy", "miler", "chins", "viola", "tower", "cream", "molls", "cello", "sucks", "fears", "stone", "leans", "zions", "nutty", "tasha", "ratty", "tenet", "raven", "coast", "roods", "mixes", "kmart", "looms", "scram", "chapt", "lites", "trent", "baron", "rasps", "ringo", "fazed", "thank", "masts", "trawl", "softy", "toils", "romes", "norma", "teens", "blank", "chili", "anise", "truss", "cheat", "tithe", "lawns", "reese", "slash", "prate", "comet", "runts", "shall", "hosed", "harpy", "dikes", "knock", "strip", "boded", "tough", "spend", "coats", "husky", "tyree", "menes", "liver", "coins", "axles", "macho", "jawed", "weeps", "goods", "pryor", "carts", "dumps", "posts", "donor", "daunt", "limbo", "books", "bowls", "welds", "leper", "benny", "couch", "spell", "burst", "elvin", "limbs", "regal", "loyal", "gaily", "blade", "wheal", "zests", "seine", "hubby", "sheen", "tapes", "slugs", "bench", "lungs", "pipes", "bride", "selma", "berry", "burns", "skins", "bowen", "gills", "conan", "yucky", "gauls", "voled", "crust", "jerky", "moans", "plump", "sided", "disks", "gleam", "larry", "billy", "aloud", "match", "udder", "rises", "wryer", "deter", "cling", "brisk", "lever", "chaps", "tansy", "gland", "rocky", "lists", "joins", "tubed", "react", "farsi", "dopes", "chats", "olsen", "stern", "gully", "youth", "wiles", "slink", "cooke", "arise", "bores", "maims", "danny", "rives", "rusts", "plots", "loxes", "troys", "cleat", "waxes", "booze", "haven", "dilly", "shaun", "gasps", "rains", "panda", "quips", "kings", "frets", "backs", "arabs", "rhino", "beets", "fiber", "duffy", "parry", "sever", "hunks", "cheap", "beeps", "fifes", "deers", "purls", "hello", "wolfs", "stays", "lands", "hawks", "feels", "swiss", "tyros", "nerve", "stirs", "mixed", "tombs", "saves", "cater", "studs", "dorky", "cinch", "spice", "shady", "elder", "plato", "hairs", "newts", "slump", "boots", "lives", "walls", "spunk", "bucks", "mined", "parch", "disco", "newel", "doris", "glues", "brawn", "abner", "piked", "laxes", "bulky", "moran", "cozen", "tinge", "dowry", "snare", "sagan", "harms", "burch", "plows", "sunni", "fades", "coach", "girls", "typed", "slush", "saver", "bulls", "grass", "holed", "coven", "dukes", "ocher", "texan", "cakes", "gilts", "jenny", "salon", "divas", "maris", "costs", "sulla", "lends", "gushy", "pears", "teddy", "huffy", "sited", "rhone", "euler", "solve", "grace", "snarl", "taste", "sally", "allay", "suers", "bogey", "pooch", "songs", "cameo", "molts", "snipe", "cargo", "forge", "reins", "hoses", "crams", "fines", "tings", "wings", "spoor", "twice", "waxed", "mixer", "bongs", "stung", "gages", "yelps", "croci", "corks", "bolls", "madge", "honer", "riled", "camus", "trick", "bowed", "overt", "steed", "ripes", "stave", "crick", "great", "scott", "scald", "point", "finch", "bulks", "chant", "kiddo", "cover", "drunk", "sered", "dicky", "wider", "saith", "mutts", "blind", "lyres", "sized", "darby", "rebel", "zones", "title", "yawns", "laths", "sting", "taine", "paris", "route", "livia", "roots", "belay", "daubs", "spoof", "camel", "colds", "foist", "saned", "doles", "slays", "woody", "leads", "stout", "caper", "erika", "lance", "earns", "vines", "mercy", "antis", "terri", "messy", "lords", "shims", "serfs", "jinni", "caged", "threw", "rainy", "bumpy", "arias", "wails", "romeo", "gorge", "dolls", "risks", "skyed", "fumes", "payed", "mites", "choir", "piles", "scene", "flake", "solon", "brahe", "bikes", "dawes", "goofs", "payne", "cried", "slavs", "hives", "snack", "cribs", "aways", "fired", "swarm", "pumas", "paved", "smith", "gooey", "liefs", "safer", "banes", "slake", "doled", "dummy", "gazed", "heaps", "loped", "scoff", "crash", "balmy", "hexed", "lunch", "guide", "loges", "alien", "rated", "stabs", "whets", "blest", "poops", "cowls", "canes", "story", "cunts", "tusks", "pinto", "scats", "flier", "chose", "brute", "laked", "swabs", "preps", "loose", "merle", "farms", "gapes", "lindy", "share", "floes", "scary", "bungs", "smart", "craps", "curbs", "vices", "tally", "beret", "lenny", "waked", "brats", "carpi", "night", "junes", "signs", "karla", "dowdy", "devil", "toned", "araby", "trait", "puffy", "dimer", "honor", "moose", "synch", "murks", "doric", "muted", "quite", "sedan", "snort", "rumps", "teary", "heard", "slice", "alter", "barer", "whole", "steep", "catty", "bidet", "bayes", "suits", "dunes", "jades", "colin", "ferry", "blown", "bryon", "sways", "bayed", "fairy", "bevel", "pined", "stoop", "smear", "mitty", "sanes", "riggs", "order", "palsy", "reels", "talon", "cools", "retch", "olive", "dotty", "nanny", "surat", "gross", "rafts", "broth", "mewls", "craze", "nerdy", "barfs", "johns", "brims", "surer", "carve", "beers", "baker", "deena", "shows", "fumed", "horde", "kicky", "wrapt", "waits", "shane", "buffy", "lurks", "treat", "savor", "wiper", "bided", "funny", "dairy", "wispy", "flees", "midge", "hooch", "sired", "brett", "putty", "caked", "witch", "rearm", "stubs", "putts", "chase", "jesus", "posed", "dates", "dosed", "yawed", "wombs", "idles", "hmong", "sofas", "capek", "goner", "musts", "tangy", "cheer", "sinks", "fatal", "rubin", "wrest", "crank", "bared", "zilch", "bunny", "islet", "spies", "spent", "filth", "docks", "notes", "gripe", "flair", "quire", "snuck", "foray", "cooks", "godly", "dorms", "silos", "camps", "mumps", "spins", "cites", "sulky", "stink", "strap", "fists", "tends", "adobe", "vivas", "sulks", "hasps", "poser", "bethe", "sudan", "faust", "bused", "plume", "yoked", "silly", "wades", "relay", "brent", "cower", "sasha", "staci", "haves", "dumbs", "based", "loser", "genes", "grape", "lilia", "acted", "steel", "award", "mares", "crabs", "rocks", "lines", "margo", "blahs", "honda", "rides", "spine", "taxed", "salty", "eater", "bland", "sweat", "sores", "ovens", "stash", "token", "drink", "swans", "heine", "gents", "reads", "piers", "yowls", "risky", "tided", "blips", "myths", "cline", "tiers", "racer", "limed", "poled", "sluts", "chump", "greek", "wines", "mangy", "fools", "bands", "smock", "prowl", "china", "prove", "oases", "gilda", "brews", "sandy", "leers", "watch", "tango", "keven", "banns", "wefts", "crass", "cloud", "hunch", "cluck", "reams", "comic", "spool", "becky", "grown", "spike", "lingo", "tease", "fixed", "linda", "bleep", "funky", "fanny", "curve", "josie", "minds", "musty", "toxin", "drags", "coors", "dears", "beams", "wooer", "dells", "brave", "drake", "merge", "hippo", "lodge", "taper", "roles", "plums", "dandy", "harps", "lutes", "fails", "navel", "lyons", "magic", "walks", "sonic", "voles", "raped", "stamp", "minus", "hazel", "clods", "tiffs", "hayed", "rajah", "pared", "hates", "makes", "hinds", "splay", "flags", "tempe", "waifs", "roved", "dills", "jonas", "avers", "balds", "balks", "perms", "dully", "lithe", "aisha", "witty", "ellie", "dived", "range", "lefty", "wined", "booby", "decor", "jaded", "knobs", "roded", "moots", "whens", "valet", "talks", "blare", "heeds", "cuing", "needy", "knees", "broke", "bored", "henna", "rages", "vises", "perch", "laded", "emily", "spark", "tracy", "tevet", "faith", "sweet", "grays", "teams", "adder", "miffs", "tubae", "marin", "folds", "basis", "drugs", "prick", "tucks", "fifth", "treks", "taney", "romps", "jerry", "bulgy", "anton", "codes", "bones", "quota", "turns", "melts", "croat", "woken", "wried", "leash", "spacy", "bless", "lager", "rakes", "pukes", "cushy", "silks", "auden", "dotes", "hinge", "noisy", "coked", "hiked", "garth", "natty", "novel", "peeve", "macaw", "sloth", "warns", "soles", "lobed", "aimee", "toads", "plugs", "chasm", "pries", "douse", "ruled", "venus", "robes", "aglow", "waves", "swore", "strum", "stael", "seeps", "snots", "freed", "truck", "hilly", "fixer", "rarer", "rhyme", "smugs", "demos", "ships", "piped", "jumpy", "grant", "dirty", "climb", "quell", "pulps", "puers", "comte", "kirks", "waver", "fever", "swear", "straw", "serum", "cowed", "blent", "yuppy", "ropes", "conks", "boozy", "feeds", "japes", "auger", "noons", "wench", "tasty", "honed", "balms", "trams", "pasha", "mummy", "tides", "shove", "shyer", "trope", "clash", "promo", "harem", "never", "humus", "burks", "plans", "tempi", "crude", "vocal", "lames", "guppy", "crime", "cough", "rural", "break", "codex", "baggy", "camry", "muses", "exile", "harte", "evens", "uriel", "bombs", "wrens", "goren", "clark", "groom", "tinny", "alias", "irwin", "ruddy", "twins", "rears", "ogden", "joker", "shaky", "sodas", "larch", "lelia", "longs", "leeds", "store", "scars", "plush", "speck", "lamar", "baser", "geeky", "wilda", "sonny", "gummy", "porch", "grain", "testy", "wreck", "spurs", "belie", "ached", "vapid", "chaos", "brice", "finks", "lamed", "prize", "tsars", "drubs", "direr", "shelf", "ceres", "swops", "weirs", "vader", "benet", "gurus", "boors", "mucky", "gilds", "pride", "angus", "hutch", "vance", "candy", "pesky", "favor", "glenn", "denim", "mines", "frump", "surge", "burro", "gated", "badge", "snore", "fires", "omens", "sicks", "built", "baits", "crate", "nifty", "laser", "fords", "kneel", "louse", "earls", "greed", "miked", "tunic", "takes", "align", "robed", "acres", "least", "sleek", "motes", "hales", "idled", "faked", "bunks", "biped", "sowed", "lucky", "grunt", "clear", "flops", "grill", "pinch", "bodes", "delta", "lopes", "booms", "lifer", "stunk", "avery", "wight", "flaps", "yokel", "burgs", "racks", "claus", "haled", "nears", "finns", "chore", "stove", "dunce", "boles", "askew", "timid", "panic", "words", "soupy", "perks", "bilge", "elias", "crush", "pagan", "silts", "clive", "shuck", "fulls", "boner", "claws", "panza", "blurb", "soaks", "skips", "shape", "yells", "raved", "poppy", "lease", "trued", "minks", "estes", "aisle", "penes", "kathy", "combo", "viper", "chops", "blend", "jolly", "gimpy", "burma", "cohan", "gazer", "drums", "gnaws", "clone", "drain", "morns", "wages", "moths", "slues", "slobs", "warps", "brand", "popes", "triad", "ounce", "stilt", "shins", "greer", "hodge", "minos", "tweed", "sexed", "alger", "floss", "timer", "steve", "birch", "known", "aryan", "hedge", "fully", "jumps", "bites", "shots", "curer", "board", "lenin", "corns", "dough", "named", "kinda", "truce", "games", "lanes", "suave", "leann", "pesos", "masks", "ghats", "stows", "mules", "hexes", "chuck", "alden", "aping", "dives", "thurs", "nancy", "kicks", "gibed", "burly", "sager", "filly", "onset", "anons", "yokes", "tryst", "rangy", "pours", "rotes", "hided", "touch", "shads", "tonya", "finer", "moors", "texas", "shoot", "tears", "elope", "tills"]).then();
// runAlgorithm(ladderLength, "hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]).then()

// 542	01 Matrix	★★★	675	934						BFS
// 698	Partition to K Equal Sum Subsets	★★★	93	131	241	282	842			Partition
/* --- end Search (BFS/DFS) ---*/

// 100	Same Tree ★★	101	104	110	111	572	965
// 814	Binary Tree Pruning	★★★	669	1325
// 112	Path Sum	★★★	113	437
// 129	Sum Root to Leaf Numbers	★★★	257
// 236 Lowest Common Ancestor of a Binary Tree ★★★	235
// 297	Serialize and Deserialize Binary Tree	★★★	449
// 508	Most Frequent Subtree Sum	★★★
// 124	Binary Tree Maximum Path Sum	★★★	543	687	Use both children, return one
// 968	Binary Tree Cameras	★★★★	337	979


export const treeMaxDepth = (node: TreeNode<number>): number => {
    if (!node) {
        return 0;
    }
    const {children} = node;
    if (children && children.length > 0) {
        const left = children[0];
        const right = children[1];
        const maxLeft = treeMaxDepth(left);
        console.log(node.id);
        const maxRight = treeMaxDepth(right);
        return Math.max(maxLeft, maxRight) + 1;
    } else {
        return 1
    }
}
/* --- end tree ---*/


/* --- start stack --- */
type HashKey = '(' | '{' | '[';
// Matching Parenthesis problem
// 20. Valid Parentheses

export const isValidParenthesis = async function (input: string, proxyHandler: TProxyHandler): Promise<boolean> {
    type IsValidParenthesisVariables = {
        stack: Stack<HashKey>,
        char: string,
    }
    const onlyHashKey = input.match(/[{}\[\]()]/g)?.join('');

    if (!onlyHashKey) {
        return false;
    }

    let variablesProxy = new DeepProxy<IsValidParenthesisVariables>({
        stack: new Stack<HashKey>(),
        char: ''
    }, proxyHandler)

    const hash: { [key in HashKey]: string } = {
        '(': ')',
        '{': '}',
        '[': ']',
    };

    for (const char of onlyHashKey) {
        await wait(500)
        if (char in hash) {
            variablesProxy.stack.push(char as HashKey);
        } else {
            const top = variablesProxy.stack.pop();
            if (top === null || hash[top] !== char) {
                return false;
            }
        }
    }

    return !variablesProxy.stack.size();
};
/* --- end stack --- */


/* --- start hash table --- */

// Using Hash Tables TODO
// 3. Longest Substring Without Repeating Characters
export const lengthOfLongestSubstring = async function (input: string, proxyHandler: TProxyHandler) {
    type LengthOfLongestSubstringVariables = {
        maxLen: number,
        curr: number,
        map: Map<string, number>
    }

    let variablesProxy = new DeepProxy<LengthOfLongestSubstringVariables>({
        maxLen: 0,
        curr: 0,
        map: new Map<string, number>(),
    }, proxyHandler);

    if (input.length < 2) {
        return input.length;
    }

    for (let i = 0; i < input.length; i++) {
        variablesProxy.curr = i;
        await wait(500);
        const mapped = variablesProxy.map.get(input[i]);
        if (mapped === undefined) {
            variablesProxy.curr++;
        } else {
            variablesProxy.curr = Math.min(i - mapped, variablesProxy.curr + 1);
        }
        variablesProxy.maxLen = Math.max(variablesProxy.maxLen, variablesProxy.curr);
        variablesProxy.map.set(input[i], i);
    }

    return variablesProxy.maxLen;
};
/* --- end hash table --- */


const searchInSortedArray = function (nums: number[], target: number) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        // const mid = Math.floor(left + right / 2);
        const mid = left + Math.floor((right - left) / 2);
        const midEle = nums[mid];
        const leftEle = nums[left];

        if (target === midEle) return mid;

        if (target < leftEle) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}

/* --- start Divide and conquer ---*/
// Binary Search
// 33 Search in Rotated Sorted Array
const searchInRotatedSortedArray = function (nums: number[], target: number) {
    if (nums.length === 0) return -1; // check empty

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        const midEle = nums[mid], leftEle = nums[left], rightEle = nums[right];

        if (midEle === target) return mid;

        // left sorted
        if (leftEle <= midEle) {
            // check if is in the left sorted part
            if (leftEle <= target && target < midEle) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
            // right sorted
        } else {
            // check if is in the right sorted part
            if (midEle < target && target <= rightEle) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
};

// 169	Majority Element	★★
// 153	Find Minimum in Rotated Sorted Array	★★	154
// 912	Sort and Array	★★★						merge sort
// 315	Count of Smaller Numbers After Self	★★★★						merge sort / BIT
// Binary Search
// 69 「sqrt(x)」

/* --- start Binary Search --- */
// 278 First Bad Version
// 875 Koko Eating Bananas
// 378
// 35	Search Insert Position	★★	34	704	981					upper_bound
// 33	Search in Rotated Sorted Array	★★★	81	153	154	162	852			rotated / peak
// 69	Sqrt(x)	★★★								upper_bound
// 74	Search a 2D Matrix	★★★								treat 2d as 1d
// 875	Koko Eating Bananas	★★★	1011
// guess ans and check
// 4	Median of Two Sorted Arrays	★★★★
// 378
// Kth Smallest Element in a Sorted Matrix
// ★★★★	668							kth + matrix
// 719	Find K-th Smallest Pair Distance	★★★★	786							kth + two pointers
/* --- end Binary Search --- */

/* --- end Divide and conquer ---*/


/* --- start Linked List ---*/
// 2	Add Two Numbers	★★	445							traversal
// 24	Swap Nodes in Pairs	★★								reverse
// 206	Reverse Linked List	★★								reverse
// 141	Linked List Cycle	★★	142							fast/slow
// 23	Merge k Sorted Lists	★★★	21							priority_queue / mergesort
// 147	Insertion Sort List	★★★								insertion sort
// 148	Sort List	★★★★								merge sort O(1) space
// 707	Design Linked List	★★★★

//206. Reverse Linked List
export type ReverseLinkedListVariables = {
    pre: SinglyLinkedListNode | null
}

export async function reverseLinkedList(head: SinglyLinkedListNode | null, proxyHandler: TProxyHandler): Promise<SinglyLinkedListNode | null> {
    let pre = null
    let variables: ReverseLinkedListVariables = {
        pre: null
    }
    let variablesProxy = new DeepProxy<ReverseLinkedListVariables>(variables, proxyHandler);
    while (head) {
        await wait(500)
        const next = head.next
        head.next = variablesProxy.pre
        variablesProxy.pre = head
        head = next
    }
    return pre
}

/* --- end Linked List ---*/


/* --- start BST --- */
//98	Validate Binary Search Tree	★★	530					inorder
// 700	Search in a Binary Search Tree	★★	701					binary search
// 230	Kth Smallest Element in a BST	★★★						inorder
// 99	Recover Binary Search Tree	★★★						inorder
// 108
// Convert Sorted Array to Binary Search Tree
// ★★★						build BST
// 501	Find Mode in Binary Search Tree	★★★						inorder
// 450	Delete Node in a BST	★★★★						binary search
/* --- end BST --- */


/* --- start Graph --- */
// 133	Clone Graph	★★	138					queue + hashtable
// 200	Number of Islands	★★	547	695	733	827	1162
// grid + connected components
// 841	Keys and Rooms	★★	1202					DFS, connected components
// 207	Course Schedule	★★★	210	802				topology sorting
// 399	Evaluate Division	★★★	839	952	990	721	737	union find
// 785	Is Graph Bipartite?	★★★	886	1042				bipartition, graph coloring
// 997	Find the Town Judge	★★★						in/out degrees
// 433	Minimum Genetic Mutation	★★★	815	863	1129	1263
// unweighted shortest path / BFS
// 684	Redundant Connection	★★★★	685	1319				cycle, union find
// 743	Network Delay Time	★★★★	787	882	924	1334		weighted shortest path
// 847
// Shortest Path Visiting All Nodes
// ★★★★	864	1298				BFS
// 332	Reconstruct Itinerary	★★★★						Eulerian path
// 1192
// Critical Connections in a Network
// ★★★★						Tarjan
// 943	Find the Shortest Superstring	★★★★★	980	996				Hamiltonian path (DFS / DP)
// 959	Regions Cut By Slashes	★★★★★						union find / grid + CCs
/* --- end Graph --- */

/* --- start Two Pointers --- */
// 11	Container With Most Water	★★	42
// 125	Valid Palindrome	★★	455
// 917	Reverse Only Letters	★★	925	986	855
// 167
// Two Sum II – Input array is sorted
// ★★★	15	16
// 977	Squares of a Sorted Array	★★
// merge sort
// 992
// Subarrays with K Different Integers
// ★★★★
/* --- end Two Pointers --- */

/* --- start Advanced --- */
// 208
// Implement Trie (Prefix Tree)
// ★★★	648	676	677	720	745	211	Trie
// 307
// Range Sum Query – Mutable
// ★★★							BIT/Segment Tree
// 901	Online Stock Span	★★★	907	1019					monotonic stack
// 239	Sliding Window Maximum	★★★							monotonic queue
/* --- end Advanced --- */



