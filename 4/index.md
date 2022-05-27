## 四 SNP 分析

## 4.1 SNP 检测

<p>&emsp;&emsp;SNP(单核苷酸多态性)主要是指在基因组水平上由单个核苷酸的变异所引起的 DNA 序
列多态性，包括单个碱基的转换、颠换等。采用 GATK 软件检测所有样本的 SNP，具体操
作步骤如下：</p>

<p>&emsp;&emsp;我们利用软件包GATK中的SelectVariants方法进行提取，为了保证 SNP 位点的可靠性，对获得的 SNP 位点进行过滤，过滤标准如下：
</p>

- QD < 2.0
- FS > 60.0
- SOR > 3.0
- MQRankSum < -12.5
- ReadPosRankSum < -8.0

> QD：variant的可靠度

> FS：Phred的概率分数

> SOR: 正义链还是反义链

> ReadPosRankSum：用来对比突变位点和原始位点是不是在reads的不同的位置

> MQRankSum：支持突变位点的reads和原始位点的reads的Mapping质量