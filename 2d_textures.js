/**
 * Used in gen_textures.html 
 * provides functions to generate 16x16 pixel arts for every knight saber 
 * variant. 
 */
const knight_saber_template = [
    "			     ",
    "          00    ",
    "          100   ",
    "          1100  ",
    "         311100 ",
    "        3221110 ",
    "       33223    ",
    "      33333     ",
    "     443333     ",
    "    443433      ",
    "   443434       ",
    "  4434344       ",
    "  434344        ",
    "  44344         ",
    "  4444          ",
    "                ",
];
const COLORS = {
    hilts: {
        iron: [153,153,153],
        gold: [255,215,0],
        obsidian: [23, 23, 23],
    },
    emitter_top: {
        iron: [170,170,170],
        gold: [218,165,32],
        obsidian: [0, 0, 0]
    },
    emitter_base: {
        iron: [153,153,153],
        gold: [255,215,0],
        obsidian: [23, 23, 23],
    },
    crystal: {
        red: [255,0,0],
        blue: [0,0,255],
        green: [0,255,0],
        purple: [109, 36, 237],
        orange: [255,165,0],
        yellow: [255,255,0]
    }
};
/**
 * 
 * @param {*} hiltMaterial 
 * @param {*} emitterBaseMaterial 
 * @param {*} emitterTopMaterial 
 * @param {*} crystal 
 */
function renderKnightSaber2DPNG(hiltMaterial, emitterBaseMaterial,emitterTopMaterial, crystal){
    const colors = {
        "0": COLORS.emitter_top[emitterTopMaterial],
        "1": COLORS.emitter_base[emitterBaseMaterial],
        "2": COLORS.crystal[crystal],
        "3": COLORS.hilts[hiltMaterial],
        "4": [0,0,0] //hilt secondary material
    } 

    const canvas = document.createElement("canvas")
    canvas.width = 16
    canvas.height = 16
    const ctx = canvas.getContext("2d")

    for(let i = 0; i < knight_saber_template.length; i++){
        for(let j = 0; j < knight_saber_template[i].length; j++){
            const key = knight_saber_template[i][j]
            if(key in colors){
                ctx.strokeStyle = `rgba(${colors[key].join(",")},1)`
                ctx.fillStyle = `rgba(${colors[key].join(",")},1)`
                ctx.fillRect(15-i,15-j,1,1)
            }
        }
    }

    const dUrl = ctx.canvas.toDataURL("image/png")
    const dAnchor = document.createElement("a")
    dAnchor.href = dUrl
    dAnchor.download = `knight_${crystal}_${hiltMaterial}_${emitterBaseMaterial}_${emitterTopMaterial}_2d.png`
    document.body.appendChild(dAnchor)
    dAnchor.style.position = "absolute"
    dAnchor.style.left = 0
    dAnchor.style.bottom = 0
    dAnchor.textContent = `knight_${crystal}_${hiltMaterial}_${emitterBaseMaterial}_${emitterTopMaterial}_2d.png`
    
    const img = document.createElement("img")
    img.src = dUrl
    img.alt = dAnchor.textContent
    document.body.appendChild(img)
    return dAnchor
}


function renderKnightSaberHilt(material){
    let highlight;
    switch(material){
        case "gold": highlight = COLORS.emitter_top[material]; break;
        case "iron": highlight = COLORS.emitter_top[material]; break;
        case "obsidian": highlight = [37,0,92]; break;
        default: highlight = "#000"

    }
    const colors = {
        "1": COLORS.hilts[material],
        "2": [0,0,0],
        "3": highlight
    } 



}





const KNIGHT_HILT_TEMPLATE = [
    "                ",
    "     111111     ",
    "     333333     ",
    "     111111     ",
    "     111111     ",
    "     111111     ",
    "    21122112    ",
    "    23122112    ",
    "    23122112    ",
    "    21122112    ",
    "    21122132    ",
    "    21122112    ",
    "     222222     ",
    "                ",
    "                ",
    "                ",
]



const EMITTER_TEMPLATE = [ 
    "                ",
    "                ",
    "    11    11    ",
    "    11111111    ",
    "    23222232    ",
    "     232232     ",
    "      2222      ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
]




const 