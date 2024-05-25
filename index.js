/**
 * Author: Andrew Bloese
 * @about
 *  generates json models with links to 3d textures for all combinations of lightsabers for the starcombat minecraft mod
 * 
 * @typedef {"knight"} HiltType
 * @typedef {"iron"|"gold"|"obsidian"} SaberMaterial
 * @typedef {"red"|"blue"|"green"|"yellow"|"orange"|"purple"} SaberColor
 */


const fs = require("fs")

const HILT_TYPES = ["knight"]
const SABER_MATERIALS = ["iron","gold","obsidian"]
const SABER_COLORS = ["red","blue","green","yellow","orange","purple"]
const SABER_HILTS = ["knight"]
const SABER_CRYSTAL_TINTERS = {
    red: "minecraft:redstone",
    blue: "minecraft:lapis_lazuli",
    green: "minecraft:emerald",
    yellow: "minecraft:glowstone_dust",
    orange: "minecraft:magma_cream",
    purple: "minecraft:amethyst_shard"
} 
const SABER_MATERIAL_IDS = {
    gold: "minecraft:gold_ingot",
    iron: "minecraft:iron_ingot",
    obsidian: "minecraft:crying_obsidian"
}

const SABER_TIP_MATERIAL_IDS = { 
    gold: "minecraft:gold_nugget",
    iron: "minecraft:iron_nugget",
    obsidian: "minecraft:obsidian"
}




/**
 * @about generate json for 2d & 3d models & main model for a given saber combination and writes to file, overwriting existing files with same name (if exists)
 * @param {HiltType} hiltType 
 * @param {SaberMaterial} hiltMaterial 
 * @param {SaberMaterial} emitterMaterial1 
 * @param {SaberMaterial} emitterMaterial2 
 * @param {SaberColor} color 
 */
async function SaberModel(hiltType,hiltMaterial,emitterMaterial1,emitterMaterial2,color){

    const saberModelId = `${hiltType}_${color}_${hiltMaterial}_${emitterMaterial1}_${emitterMaterial2}`
    const modelRoot = "starcombat:item"
    
    //the json schema 
    const model = `{
        "parent":"minecraft:item/handheld",
        "loader": "forge:separate_transforms",
        "base": {
            "parent": "${modelRoot}/${saberModelId}_3d"
        },
        "perspectives": {
            "gui": {
                "parent": "${modelRoot}/${saberModelId}_2d"
            },
            "ground": {
                "parent": "${modelRoot}/${saberModelId}_2d"
            },
            "fixed": {
                "parent": "${modelRoot}/${saberModelId}_2d"
            }
        }

    }`


    const model2d = `{
        "parent": "item/generated",
        "textures": {
          "layer0": "starcombat:item/${saberModelId}_2d"
        }
      }`

    const model3d = `{
        "credit": "Made with Blockbench",
        "texture_size": [32, 32],
        "textures": {
            "1": "starcombat:item/saber_components/hilt_${hiltType}_${hiltMaterial}",
            "2": "starcombat:item/saber_components/hilt_${hiltType}_mid_${hiltMaterial}",
            "3": "starcombat:item/saber_components/hilt_${hiltType}_btn",
            "4": "starcombat:item/saber_components/emitter_base_${emitterMaterial1}",
            "12": "starcombat:item/saber_components/emitter_top_${emitterMaterial2}",
            "21": "starcombat:item/saber_components/saber_tip_${color}",
            "22": "starcombat:item/saber_components/saber_blade_${color}"
        },
        "elements": [
            {
                "name": "hilt_b",
                "from": [6, 0, 6],
                "to": [8.75, 6.5, 9],
                "rotation": {"angle": 0, "axis": "y", "origin": [0, 9, 0]},
                "faces": {
                    "north": {"uv": [6, 0, 8.75, 6.5], "texture": "#1"},
                    "east": {"uv": [0, 0, 3, 6.5], "texture": "#1"},
                    "south": {"uv": [0, 7, 2.75, 13.5], "texture": "#1"},
                    "west": {"uv": [3, 0, 6, 6.5], "texture": "#1"},
                    "up": {"uv": [5.75, 10, 3, 7], "texture": "#1"},
                    "down": {"uv": [8.75, 7, 6, 10], "texture": "#1"}
                }
            },
            {
                "name": "hilt_m",
                "from": [6.5, 6.5, 6.5],
                "to": [8.25, 11, 8.5],
                "rotation": {"angle": 0, "axis": "y", "origin": [7.5, 10, 7.5]},
                "faces": {
                    "north": {"uv": [4, 0, 5.75, 4.5], "texture": "#2"},
                    "east": {"uv": [0, 0, 2, 4.5], "texture": "#2"},
                    "south": {"uv": [0, 5, 1.75, 9.5], "texture": "#2"},
                    "west": {"uv": [2, 0, 4, 4.5], "texture": "#2"},
                    "up": {"uv": [3.75, 7, 2, 5], "texture": "#2"},
                    "down": {"uv": [5.75, 5, 4, 7], "texture": "#2"}
                }
            },
            {
                "name": "hilt_btn",
                "from": [6.25, 9, 7],
                "to": [7, 9.5, 8],
                "rotation": {"angle": 0, "axis": "y", "origin": [6.75, 10.5, 7.5]},
                "faces": {
                    "north": {"uv": [0, 8, 3, 10], "texture": "#3"},
                    "east": {"uv": [4, 0, 8, 2], "texture": "#3"},
                    "south": {"uv": [8, 0, 11, 2], "texture": "#3"},
                    "west": {"uv": [4, 4, 8, 6], "texture": "#3"},
                    "up": {"uv": [3, 4, 0, 0], "texture": "#3"},
                    "down": {"uv": [3, 4, 0, 8], "texture": "#3"}
                }
            },
            {
                "name": "emitter_b",
                "from": [6, 10.5, 6],
                "to": [8.75, 12, 9],
                "rotation": {"angle": 0, "axis": "y", "origin": [7.5, 12.5, 7.5]},
                "faces": {
                    "north": {"uv": [6, 8, 11.5, 11], "texture": "#4"},
                    "east": {"uv": [6, 0, 12, 3], "texture": "#4"},
                    "south": {"uv": [0, 12, 5.5, 15], "texture": "#4"},
                    "west": {"uv": [6, 4, 12, 7], "texture": "#4"},
                    "up": {"uv": [5.5, 6, 0, 0], "texture": "#4"},
                    "down": {"uv": [5.5, 6, 0, 12], "texture": "#4"}
                }
            },
            {
                "name": "emitter_t",
                "from": [5.5, 11.5, 5.5],
                "to": [9.25, 12.1, 9.5],
                "rotation": {"angle": 0, "axis": "y", "origin": [-0.5, 21, -0.25]},
                "faces": {
                    "north": {"uv": [8, 4, 15.5, 5.25], "texture": "#12"},
                    "east": {"uv": [8, 0, 16, 1.25], "texture": "#12"},
                    "south": {"uv": [8, 6, 15.5, 7.25], "texture": "#12"},
                    "west": {"uv": [8, 2, 16, 3.25], "texture": "#12"},
                    "up": {"uv": [7.5, 8, 0, 0], "texture": "#12"},
                    "down": {"uv": [7.5, 8, 0, 16], "texture": "#12"}
                }
            },
            {
                "name": "blade_main",
                "from": [6, 11.75, 6.25],
                "to": [8.75, 31.75, 8.75],
                "rotation": {"angle": 0, "axis": "y", "origin": [6, 14.5, 6.25]},
                "faces": {
                    "north": {"uv": [0, 0, 1.5, 10], "texture": "#22"},
                    "east": {"uv": [3, 0, 4.25, 10], "texture": "#22"},
                    "south": {"uv": [1.5, 0, 3, 10], "texture": "#22"},
                    "west": {"uv": [4.5, 0, 5.75, 10], "texture": "#22"},
                    "up": {"uv": [7.5, 1.25, 6, 0], "texture": "#22"},
                    "down": {"uv": [7.5, 1.5, 6, 2.75], "texture": "#22"}
                }
            },
            {
                "name": "blade_top",
                "from": [6.225, 29.875, 6.3],
                "to": [8.6, 31.875, 8.7],
                "rotation": {"angle": 0, "axis": "y", "origin": [2.975, 25.875, -0.2]},
                "faces": {
                    "north": {"uv": [6, 0, 11, 4], "texture": "#21"},
                    "east": {"uv": [6, 4, 11, 8], "texture": "#21"},
                    "south": {"uv": [6, 8, 11, 12], "texture": "#21"},
                    "west": {"uv": [0, 12, 5, 16], "texture": "#21"},
                    "up": {"uv": [5, 5, 0, 0], "texture": "#21"},
                    "down": {"uv": [5, 6, 0, 11], "texture": "#21"}
                }
            }
        ],
        "display": {
            "thirdperson_righthand": {
                "translation": [0.75, 2.75, 1.25]
            }
        },
        "groups": [
            {
                "name": "knight_hilt",
                "origin": [8, 8, 8],
                "color": 0,
                "children": [
                    {
                        "name": "hilt",
                        "origin": [0, 0, 0],
                        "color": 0,
                        "children": [0, 1, 2]
                    },
                    {
                        "name": "emitter",
                        "origin": [0, 0, 0],
                        "color": 0,
                        "children": [3, 4]
                    }
                ]
            },
            {
                "name": "blade",
                "origin": [8, 8, 8],
                "color": 0,
                "children": [5, 6]
            }
        ]
    }`



    const modelsRoot = "/Users/blaze/Downloads/starwars-mc-mod/src/main/resources/assets/starcombat/models/item" 
    const model_base = `${modelsRoot}/${saberModelId}`

    const pool = [
        //write the 3d model (in hand)
        fs.promises.writeFile(`${model_base}_3d.json`,model3d,"utf-8"),
        //write 2d model (inventory)
        fs.promises.writeFile(`${model_base}_2d.json`,model2d,"utf-8"),
        //write main model that loads the other model(s)
        fs.promises.writeFile(`${model_base}.json`, model, "utf-8")
    ];
    await Promise.all(pool)
    
}

//generates all possible combination of saber hilts emitters and materials
function getArgumentCombos(){
    const combos=[]
    //each color, hilt type, and 3 materials
    for(const color of SABER_COLORS){
        for(const ht of SABER_HILTS){
            for(const hm of SABER_MATERIALS){
                for(const e1 of SABER_MATERIALS){
                    for(const e2 of SABER_MATERIALS){
                        combos.push([ht,hm,e1,e2,color])
                    }
                }
            }
        }
    }
    return combos
}


const translations = {}
const registrations = []
const declarations = []

//helper, just capitalizes the first letter of each string, and lowercases the rest
function capitalize(str){
    let s = str.toLowerCase()
    let c = str[0].toUpperCase()
    for(let i = 1; i < s.length; i++) {
        c+= s[i]
    }
    return c
}


//helper, appends translation key and value to global translations as well as generates a java "declaration" in global array `declarations`
function translateLang(hiltType,hiltMaterial,emitterBaseMaterial,emitterTopMaterial,color){
    
    const [t,m,em1,em2,c] = [hiltType,hiltMaterial, emitterBaseMaterial, emitterTopMaterial, color].map(capitalize)
    const visibleName = `(${c}) ${m} ${t} Hilt with ${em1}/${em2} Emitter`
    //java code...
    const itemId = `${hiltType}_${color}_${hiltMaterial}_${emitterBaseMaterial}_${emitterTopMaterial}`
    translations[`item.starcombat.${itemId}`] = visibleName
    const javaName = itemId.toUpperCase();
    
    //declare mod items 
    declarations.push(
        `public static final RegistryObject<Item> ${javaName} = ITEMS.register("${itemId}",
            () -> new LightsaberItem(new Item.Properties()));`
    );
    
    //register to custom creative tab
    registrations.push(`output.accept(ModItems.${javaName}.get());`);
   
    
}


// builds all model.json and model_3d.json files all possible sabers
async function buildModels(){
    console.time("== BUILD SABERS ==")
    console.log("Building Saber Models – generating combinations...")
    const argumentCombos = getArgumentCombos()
    console.log(`Found ${argumentCombos.length} combinations!\nStarting model generation...`)


    for(let i = 0; i < argumentCombos.length; i++){
        if(argumentCombos[i].length != 5){
            console.error("Invalid combo, expected 5 arguments, got: ", combo.length);
        } else {
            const [ hT, hM, eM1, eM2, c ] = argumentCombos[i]; 
            if(!HILT_TYPES.includes(hT) || !SABER_MATERIALS.includes(hM) || !SABER_MATERIALS.includes(eM1) || !SABER_MATERIALS.includes(eM2) || !SABER_COLORS.includes(c)){
                console.error(`Error generating saber model with arguments: [${argumentCombos[i].join(",")}]`)
            } else { 
                //valid saber - generate json files
                await SaberModel(hT,hM,eM1,eM2,c);
                translateLang(hT,hM,eM1,eM2,c);
            }
        }
    }
    console.log('Finished Building Saber Models');
    console.timeEnd("== BUILD SABERS ==");
    console.log('#Declarations Generated: ', declarations.length);
    console.log("Dumping declarations")
    fs.writeFileSync("dump_declarations.java", declarations.join("\n"), "utf-8");
    console.log("Dumping translations")
    fs.writeFileSync("dump_translations.json", JSON.stringify(translations,null,4), "utf-8");
    console.log("Dumping Creative Tab Registrations")
    fs.writeFileSync("dump_registrations.java",registrations.join("\n"),"utf-8");

    console.log("Dumped the generated Declarations and Tranlations")
    


}



//generates crafting recipes for all saber crystals, emitters, and knight hilts, as well as all saber combinations
function RecipiesGenerator(){
    const recipesRoot = "/Users/blaze/Downloads/starwars-mc-mod/src/main/resources/data/starcombat/recipies"
    const templateEmitter = [
       "TGT",
       "BBB",
       " B "
    ]

    const templateKnightHilt = [
        " M ",
        "OMO",
        "OMO",
    ]

    //c = tinter [amethyst->purple, lapiz->blue, emerald->green, redstone->red, magmacream->orange, glowstone->yellow]
    //d = diamonds
    const templateSaberCrystal = [
        "CDC",
        "DDD",
        "CDC"
    ]

    //all colored saber crystal recipes
    for(const color of SABER_COLORS){
        const path = `${recipesRoot}/saber_crystal_${color}.json`
        fs.writeFileSync(path, JSON.stringify({
            type: "minecraft:crafting_shaped",
            category: "misc",
            group: "saber_crystal",
            pattern: templateSaberCrystal,
            key: {
                C: {item:SABER_CRYSTAL_TINTERS[color]},
                D: {item:"minecraft:diamond"}
            },
            result: {
                item: `starcombat:saber_crystal_${color}`,
            }, 
            show_notification: true

        },null,4),"utf-8")
    }

    //all knight hilts
    for(const hiltMaterial of SABER_MATERIALS){
        const hiltId = `saber_hilt_knight_${hiltMaterial}`
        const path = `${recipesRoot}/${hiltId}.json`
        fs.writeFileSync(path, JSON.stringify({
            type: "minecraft:crafting_shaped",
            category: "misc",
            group: "knight_hilt",
            pattern: templateKnightHilt,
            key: {
                M: {item: `${SABER_MATERIAL_IDS[hiltMaterial]}`},
                O: {item: "minecraft:obsidian"}
            },
            result: {
                item: `starcombat:${hiltId}`,
            },
            show_notification: true

        }, null,4),"utf-8")
    }


    //all emitters
    for(const emitterMaterial1 of SABER_MATERIALS){
        for(const emitterMaterial2 of SABER_MATERIALS){
            const emitterId = `saber_emitter_${emitterMaterial1}_${emitterMaterial2}`
            const path = `${recipesRoot}/${emitterId}.json`
            fs.writeFileSync(path, JSON.stringify({
                type: "minecraft:crafting_shaped",
                category: "misc",
                group: "saber_emitter",
                pattern: templateEmitter,
                key: {
                    B: {item:`${SABER_MATERIAL_IDS[emitterMaterial1]}`},
                    T: {item: `${SABER_TIP_MATERIAL_IDS[emitterMaterial2]}`},
                    G: {item: `minecraft:glass`}
                },
                result: {
                    item: `starcombat:${emitterId}`,
                },
                show_notification: true
            },null,4),"utf-8")


        }
    }

    //e = emitter
    //h = hilt
    //c = saber crystal
    //r = redstone
    const templateSaber = [ 
        " E ",
        "RCR", 
        " H "
    ]


    //all sabers
    for(const hiltType of SABER_HILTS){
        console.log("Recipies for HiltType: ", hiltType)
        for(const hiltMaterial of SABER_MATERIALS){
            console.log("Recipies For HiltMaterial: ", hiltMaterial)
            for(const em1 of SABER_MATERIALS){
                console.log("Recipies For Em1: ", em1)
                for(const em2 of SABER_MATERIALS){
                    console.log("Recipies For Em1: ", em2)
                    for (const color of SABER_COLORS){
                        console.log("Recipies For Color: ", color)
                        //build the recipe file
                        const saberID = `${hiltType}_${color}_${hiltMaterial}_${em1}_${em2}`
                        const path = `${recipesRoot}/${saberID}.json`
                        console.log('===\nwriting to path:' + path + "\n===")
                        fs.writeFileSync(path, JSON.stringify({
                            type: "minecraft:crafting_shaped",
                            category: "misc",
                            group: "lightsaber",
                            pattern: templateSaber,
                            key: {
                                E: {item:`starcombat:saber_emitter_${em1}_${em2}`},
                                R: {item:"minecraft:redstone"},
                                H: {item:`starcombat:saber_hilt_${hiltType}_${hiltMaterial}`},
                                C: {item:`starcombat:saber_crystal_${color}`}
                            },
                            result: {
                                item: `starcombat:${saberID}`,
                            },
                            show_notification: true
                        },null,4),"utf-8")
                    }
                }
            }
        }
    }
}


async function main(){
    console.time("starcombat_generator");
    console.log("=== Building Models ===");
    await buildModels();
    console.log("=== Building Recipes ===");
    RecipiesGenerator();
    console.timeEnd("starcombat_generator");
    console.log("DONE");
}

main()