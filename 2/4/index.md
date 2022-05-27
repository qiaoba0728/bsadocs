## 2.4 高质量数据获取

<p>&emsp;&emsp;测序数据包含一些带接头、低质量的 reads，这些序列会对后续的信息分析造成很大的干扰，为了保证后续信息分析质量，需要对下机数据进行进一步过滤，即将原始下机数据（raw data）过滤生成高质量序列（high quality data）。数据过滤的标准主要包括以下几点：
</p>

1. 接头污染去除，采用 AdapterRemoval（version 2）（Schubert M 等，2016）去除 3' 端的接头污染；

2. 质量过滤，采用滑动窗口法进行质量过滤，窗口大小设置为 5 bp，步长设置为 1 bp。每一次往前移动一个碱基，取 5 个碱基计算窗口的平均 Q 值，若最后一个碱基的 Q 值 ≤ 2，则仅保留该位置之前的碱基；若窗口的平均 Q 值 ≤
   20，则仅保留该窗口倒数第二个碱基及之前的碱基；

3. 长度过滤，若双末端中任意一条 reads 的长度 ≤ 50 bp，则去除该双末端 reads。数据过滤的基本情况见表4。

<center><b>表4 数据过滤统计</b></center>

|  Sample  | Clean Reads No.              |Clean Data (bp)|Clean Reads (%)|Clean Data (%)|
| :--------: | :--------: | :--------: | :--------: | :--------: | 
{{table}}


**注**：
- Sample：样品名；
- Clean Reads No.：高质量序列read数；
- Clean Data (bp)：高质量序列碱基数；
- Clean Reads (%)： 高质量序列 reads 占测序 reads 的百分比；
- Clean Data (%)： 高质量序列碱基占测序碱基的百分比。
