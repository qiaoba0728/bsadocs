## 5.1 InDel 检测

<p>&emsp;&emsp;InDel是小型的Insertion和Deletion的总称。我们采用GATK软件包中SelectVariants方法提取INDEL。
</p>


<p>&emsp;&emsp;为了保证InDel结果的可靠性，进一步对InDel位点进行过滤，过滤标准如下：</p>


- QD < 2.0
- FS > 200.0
- SOR > 10.0
- MQRankSum < -12.5
- ReadPosRankSum < -8.0

> QD：variant的可靠度

> FS：Phred的概率分数

> SOR: 正义链还是反义链

> ReadPosRankSum：用来对比突变位点和原始位点是不是在reads的不同的位置

> MQRankSum：支持突变位点的reads和原始位点的reads的Mapping质量


