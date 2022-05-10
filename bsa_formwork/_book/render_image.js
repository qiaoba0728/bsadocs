let fs = require('fs');
let path = require('path');

let outputPrefix = "/data/output/code_result/book"

function fileDisplay(filePath) {
    console.log("copy images")
    let names = [];
    let files = fs.readdirSync(filePath);
    files.forEach(filename => {
        let filedir = path.join(filePath, filename);
        let stats = fs.statSync(filedir)
        if (stats.isDirectory() && filename.endsWith(".clean_fastqc")) {
            let name = filename.replace(".clean_fastqc","");
            names.push(name);
            fs.writeFileSync(outputPrefix + "/images/2.3.1-" + name + ".png", fs.readFileSync(filedir + "/Images/per_base_quality.png"));
            fs.writeFileSync(outputPrefix + "/images/2.3.2-" + name + ".png", fs.readFileSync(filedir + "/Images/per_base_sequence_content.png"));
            fs.writeFileSync(outputPrefix + "/images/2.3.3-" + name + ".png", fs.readFileSync(filedir + "/Images/per_sequence_gc_content.png"));
            fs.writeFileSync(outputPrefix + "/images/2.3.4-" + name + ".png", fs.readFileSync(filedir + "/Images/per_sequence_quality.png"));
        }
    })
    fs.writeFileSync(outputPrefix + "/images/6.2-1.png", fs.readFileSync("/data/output/bsa_result/Average_Delta_with_confidence_interval_p.png"));
    fs.writeFileSync(outputPrefix + "/images/6.2-2.png", fs.readFileSync("/data/output/bsa_result/Average_Delta_with_confidence_interval_w.png"));
    fs.writeFileSync(outputPrefix + "/images/6.3-1.png", fs.readFileSync("/data/output/bsa_result/Average_Delta_with_confidence_interval_adjuest.png"));
    fs.writeFileSync(outputPrefix + "/images/6.3-2.png", fs.readFileSync("/data/output/bsa_result/Average_Delta_with_confidence_interval_line.png"));
    render_detail(names)
    // render_table()
}

function render_detail(names) {
    console.log("render details", names)
    try {
        let file = outputPrefix + "/2/3/index.md"
        let data = fs.readFileSync(file, 'utf8');
        let detail = "";
        for (let name of names) {
            detail += `<details open><summary>${name}</summary><center><img src='/images/2.3.1-${name}.png'></center></details>\n`
        }
        data = data.replace("{{detail}}", detail)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/2/3/1/index.md"
        let data = fs.readFileSync(file, 'utf8');
        let detail = "";
        for (let name of names) {
            detail += `<details open><summary>${name}</summary><center><img src='/images/2.3.1-${name}.png'></center></details>\n`
        }
        data = data.replace("{{detail}}", detail)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/2/3/2/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let detail = "";
        for (let name of names) {
            detail += `<details open><summary>${name}</summary><center><img src='/images/2.3.2-${name}.png'></center></details>\n`
        }
        data = data.replace("{{detail}}", detail)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/2/3/3/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let detail = "";
        for (let name of names) {
            detail += `<details open><summary>${name}</summary><center><img src='/images/2.3.3-${name}.png'></center></details>\n`
        }
        data = data.replace("{{detail}}", detail)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/2/3/4/index.md"
        let data = fs.readFileSync(file, 'utf8')
        let detail = "";
        for (let name of names) {
            detail += `<details open><summary>${name}</summary><center><img src='/images/2.3.4-${name}.png'></center></details>\n`
        }
        data = data.replace("{{detail}}", detail)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
}

function render_table() {
    let table_2_1 = ""
    let table_2_3 = ""
    let fileDir = "/data/output/clean/";
    let files = fs.readdirSync(fileDir);
    files.forEach(filename => {
        let full_name = path.join(fileDir, filename);
        if (fs.statSync(full_name).isFile() && path.extname(filename) === "json") {
            let name = filename.split(".")[0];
            let content = fs.readFileSync(full_name)
            let data = JSON.parse(content)
            table_2_1 += `| ${name} | ${data.summary.after_filtering.total_reads} | ${data.summary.after_filtering.total_bases} | ${(data.summary.after_filtering.gc_content * 100).toFixed(2)} |  ${data.summary.after_filtering.q20_bases} | ${(data.summary.after_filtering.q20_rate * 100).toFixed(2)} | ${data.summary.after_filtering.q30_bases} | ${(data.summary.after_filtering.q30_rate * 100).toFixed(2)} |\n`;
            table_2_3 += `| ${name} | ${data.summary.after_filtering.total_reads} | ${(data.summary.after_filtering.total_bases / data.summary.before_filtering.total_bases * 100).toFixed(2)} | ${data.summary.after_filtering.total_bases} |  ${(data.summary.after_filtering.total_bases / data.summary.before_filtering.total_bases * 100).toFixed(2)} |\n`
        }
    })

    try {
        let file = outputPrefix + "/2/1/index.md"
        let data = fs.readFileSync(file, 'utf8')
        data = data.replace("{{table}}", table_2_1)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
    try {
        let file = outputPrefix + "/2/3/index.md"
        let data = fs.readFileSync(file, 'utf8')
        data = data.replace("{{table}}", table_2_3)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
}

fileDisplay("/data/output/report_result")
// 挂载 output/ -> /data/output/