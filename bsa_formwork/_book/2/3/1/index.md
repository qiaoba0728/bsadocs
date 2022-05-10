## 2.3.1 碱基质量分布

<p>&emsp;&emsp;采用 FastQC（http://www.bioinformatics.babraham.ac.uk/projects/fastqc）对数据进行质量
控制，具体结果分别见图1-1、图1-2、图1-3 和 图1-4。</p>

<details open><summary>Mut.HQ_R1</summary><center><img src='/images/2.3.1-Mut.HQ_R1.png'></center></details>
<details open><summary>Mut.HQ_R2</summary><center><img src='/images/2.3.1-Mut.HQ_R2.png'></center></details>
<details open><summary>WT.HQ_R1</summary><center><img src='/images/2.3.1-WT.HQ_R1.png'></center></details>
<details open><summary>WT.HQ_R2</summary><center><img src='/images/2.3.1-WT.HQ_R2.png'></center></details>



<small><p>&emsp;&emsp;横坐标是 reads 碱基位置（5’->3’），纵坐标是所有 reads 在该位点碱基 Q 值统计。红线代表中位数，蓝
线代表平均数，黄线代表 25%-75%区间，触须是 10%-90%区间。一般而言，reads 的 5’端和 3’端的碱基质
量较低，中间部分的碱基质量较高。从图中可知，本次测序过滤后的数据平均质量非常高。</p></small>