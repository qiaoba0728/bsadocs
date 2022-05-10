let fs = require('fs');
let path = require('path');

let outputPrefix = "/template"
let clean = require('./render_image')
function TableMarkdown(data) {
    let table = ""
    for (let i in data) {
        let item = data[i];
        let line = "|"
        for (let x of item) {
            line += " " + x + " |"
        }
        table += line + "\n"
    }
    table += "\n";
    return table;
}
function get_before_summary() {
    return fs.readFileSync("/data/output/clean/beforeSummary.template")
}

function get_result_summary() {
    return fs.readFileSync("/data/output/clean/result.template")
}
function get_snp_note() {
    return fs.readFileSync("/data/output/report_result/note/bsa_snp_result.txt")
}
function get_indel_note() {
    return fs.readFileSync("/data/output/report_result/note/bsa_indel_result.txt")
}
function render_table() {
    let content = fs.readFileSync("/data/bsa.json")
    let BsaData = JSON.parse(content)

    // 渲染 project
    try {
        let file = outputPrefix + "/README.md"
        let data = fs.readFileSync(file, 'utf8')
        data = data.replace("{{project.number}}", BsaData.project.number)
        data = data.replace("{{project.type}}", BsaData.project.type)
        data = data.replace("{{project.species}}", BsaData.project.species)
        data = data.replace("{{project.sampleForm}}", BsaData.project.sampleForm)
        data = data.replace("{{project.platform}}", BsaData.project.platform)
        data = data.replace("{{project.dataSize}}", BsaData.project.dataSize)
        data = data.replace("{{project.analyse}}", BsaData.project.analyse)
        data = data.replace("{{project.finished}}", BsaData.project.finished)
        data = data.replace("{{project.manager}}", BsaData.project.manager)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    console.log("render project finished")
    try {
        let file = outputPrefix + "/3/index.md"
        let data = fs.readFileSync(file, 'utf8')
        data = data.replace("{{geneDetails.totalLen}}", BsaData.gene.data[0])
        data = data.replace("{{geneDetails.totalSeqNum}}", BsaData.gene.data[1])
        data = data.replace("{{geneDetails.totalNCounts}}", BsaData.gene.data[2])
        data = data.replace("{{geneDetails.totalLowCaseCounts}}", BsaData.gene.data[3])
        data = data.replace("{{geneDetails.totalGCContent}}", BsaData.gene.data[4])
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    console.log("render geneDetail finished")
    // 渲染 projectDesc
    try {
        let file = outputPrefix + "/1/2/2/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(BsaData.projectDesc.samples)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    // 渲染 clean desc
    try {
        let file = outputPrefix + "/2/1/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(BsaData.clean.desc)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/2/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(BsaData.clean.desc)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    // 渲染 clean data
    try {
        let file = outputPrefix + "/2/2/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let summary = get_before_summary()
        console.log("before summery:",summary)
        data = data.replace("{{table}}", summary)
        //let table = TableMarkdown(BsaData.clean.data)
        data = data.replace("{{table}}", data)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    // 渲染 clean filter
    try {
        let file = outputPrefix + "/2/4/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let summary = get_result_summary()
        console.log("after summery:",summary)
        //let table = TableMarkdown(BsaData.clean.filter)
        data = data.replace("{{table}}", summary)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    // 渲染 gene data 3.1
    try {
        let file = outputPrefix + "/3/index.md"
        let data = fs.readFileSync(file, 'utf8')
        for (let i in BsaData.gene.data) {
            data = data.replace("{{" + i + "}}", BsaData.gene.data[i])
        }
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/3/1/index.md"
        let data = fs.readFileSync(file, 'utf8')
        for (let i in BsaData.gene.data) {
            data = data.replace("{{" + i + "}}", BsaData.gene.data[i])
        }
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    // 提取 测序深度和覆盖度
    // let files = fs.readdirSync("/data/output/report_result");
    // let num = Math.round(Math.random()*(70000-50000)+50000)
    // let reportInput = []
    // files.forEach(filename => {
    //     let filedir = path.join("/data/output/report_result", filename);
    //     if (filename.endsWith(".report")) {
    //         let name = filename.replace(".report", "");
    //         let input = fs.readFileSync(filedir, 'utf8');
    //         let line = get_line(filedir,2);
    //         line = line.replace("Total pairs:", "");
    //         line = line.replace(" ", "");
    //         let all = get_line(filedir,11);
    //         all = all.replace("Overall alignment rate:", "");
    //         all = all.replace(" ", "");
    //         let result = get_blast_report(name,line,all,input);
    //         reportInput.push(result);
    //         // sample 
    //         let temp = [name,"LRA" + num,"380bp","lllumina NovaSeq","Paired-end 2*150bp"]
    //         samples.push(temp)
    //         num++
    //     }
    // })



    // 渲染 gene serial
    try {
        let file = outputPrefix + "/3/3/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(BsaData.gene.serial)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    // 渲染 gene depth
    // TODO 需要修改自动识别文件
    try {
        let file = outputPrefix + "/3/4/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let table = TableMarkdown(BsaData.gene.depth)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    // 渲染 snp node
    // try {
    //     let file = outputPrefix + "/4/2/index.md"
    //     let data = fs.readFileSync(file, 'utf8')
    //     for (let i in BsaData.snp.node) {
    //         data = data.replace("{{" + i + "-0}}", BsaData.snp.node[i][0])
    //         data = data.replace("{{" + i + "-1}}", BsaData.snp.node[i][1])
    //     }
    //     fs.writeFileSync(file, data)
    // } catch (err) {
    //     console.error(err)
    // }

    try {
        let file = outputPrefix + "/4/2/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let note = get_snp_note()
        console.log("snp note:",note)
        //let table = TableMarkdown(BsaData.clean.data)
        data = data.replace("{{table}}", note)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    // 渲染 indel node
    // try {
    //     let file = outputPrefix + "/5/2/index.md"
    //     let data = fs.readFileSync(file, 'utf8')
    //     for (let i in BsaData.indel.node) {
    //         data = data.replace("{{" + i + "-0}}", BsaData.indel.node[i][0])
    //         data = data.replace("{{" + i + "-1}}", BsaData.indel.node[i][1])
    //     }
    //     fs.writeFileSync(file, data)
    // } catch (err) {
    //     console.error(err)
    // }


    try {
        let file = outputPrefix + "/5/2/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let note = get_indel_note()
        console.log("indel note:",note)
        //let table = TableMarkdown(BsaData.clean.data)
        data = data.replace("{{table}}", note)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }


    // 渲染 index site
    try {
        let file = outputPrefix + "/6/2/index.md"
        let data = fs.readFileSync(file, 'utf8')
        for (let i in BsaData.index.site) {
            data = data.replace("{{index.site." + i + "}}", BsaData.index.site[i])
        }
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }

    // 渲染 target index & result
    try {
        let file = outputPrefix + "/7/index.md"
        let data = fs.readFileSync(file, 'utf8')
        // index 
        data = data.replace("{{target.index.0}}", BsaData.target.index[0])
        data = data.replace("{{target.index.1}}", BsaData.target.index[1])
        // result   
        let table = TableMarkdown(BsaData.target.result)
        data = data.replace("{{table}}", table)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    clean.fileDisplay("/data/output/report_result")
    clean.buildResult()
}

render_table()
// 挂载 output/ -> /data/