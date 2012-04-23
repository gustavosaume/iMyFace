What the .... is this?
======================

This project contains my answer to the Hacker Challenge for the General Assembly CS for Hackers course. For more info about the requirements and the course [click here](https://github.com/generalassembly/cs-for-hackers/tree/master/week-03)

Goals
=====

Analyze different data structures and algorithms and provide an implementation that supports basic operation on a "Social Graph".

Choosing the right(or wrong) tools for the job
===============================================

After a few projects developed with Python it was my obvious answer, but one day I remembered [this post](http://dougmccune.com/blog/2008/09/13/using-bitmapdata-for-array-manipulation-in-as3/) from Doug McCune (from back in the days when I was working with Flex) and thought it would be fun to use a similar approach to build an adjacency matrix.

I fired up Flex Builder and minutes later my computer almost crashed. I forgot how slow and resource consuming Flex Builder was, so after seconds of consideration I dropped Flex as an alternative. But the Bitmapdata idea kept reappearing in my thoughts and decided to try the Canvas element, so I moved to JavaScript. 

If you look at the demo you'll notice that there is no Canvas. This has to be with time and me being lazy... but definitely want to update this later.

Ok, stop talking... lets move on.

Data Structure
==============

After running some tests (check out the test page) I decided to go with a hash implementation of a graph. That is a hash dict (or associative array to go with the js concepts) in which each key represented by the user id points to a Node that contains the user details and a list of its readers. This list contains the user id's of all of those who receive the post made by the node.

One of the main advantages of this data structure is that it offers constant read times and allows to represent an adjacency matrix in a optimized way (not being square).

Algorithms
==========

Search
------

Thanks to the data structure selected the search times are constant O(1) and is as simple as querying the hash with the user id.

Graph Traversal
---------------

The traversal of the graph was implemented with a simple recursive algorithm which goes breadth first, going deep into the branches until finds the destination or ran out of nodes.

The same algorithm allows to validate if two nodes are connected or to search all the different path between such nodes. Also, keep track of the visited nodes to avoid infinite cycles.

Min path
--------

The large data set with cycles made the previous algorithm useless. The amount of time taken to get all the paths was so large that browser hanged. Moreover, because every path is being stored, the memory of the application grew very fast due to the large amount of path found.

So, as an alternative (bonus) I implemented a two dimensional matrix to take advantage of the properties of the adjacency matrix. By multiplying the matrix by itself we can get all the paths with two vertices and so on. With the exception of the worst case, when the nodes doesn't connect at all, it produces great results and with a constant memory usage.