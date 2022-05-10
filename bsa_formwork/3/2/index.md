## 3.2 序列对比

<p>&emsp;&emsp;采用 bwa mem 程序将过滤后的高质量数据比对到参考基因组上，比对采用默认参数。采用 Picard 1.107 软件对 sam 文件进行排序并转换为 bam 文件。测序数据的生成过程涉及到文库的扩增和簇的形成，这两个步骤容易产生一些Duplicates（即 PCR Duplicates 和 Optical Duplicates），这些 Duplicates 不能作为变异检测的证据。采用 Picard 软件包中的 “MarkDuplicates” 去除 Duplicates，即如果多个 Paired Reads比对后具有相同的染色体坐标，则仅保留分值最高的 Paired Reads。InDel 附近的 reads 最容易出现 Mapping 错误，为了尽量减少由于 Mapping 错误导致的 SNP，需要对 InDel 附近的 reads 重新进行比对，以提高 SNP Calling 的准确性。</p>
