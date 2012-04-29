What the .... is this?
======================

This project contains my answer to the Hacker Challenge for the General Assembly CS for Hackers course. For more info about the requirements and the course [click here](https://github.com/generalassembly/cs-for-hackers/tree/master/week-03)

Goals
=====

Analyze different data structures and algorithms and provide an implementation that supports basic operation on a "Social Graph".

Choosing the right(or wrong) tools for the job
===============================================

After a few projects developed with Python it was my obvious answer, but one day I remembered [this post](http://dougmccune.com/blog/2008/09/13/using-bitmapdata-for-array-manipulation-in-as3/) from Doug McCune (from back in the days when I was working with Flex) and thought it would be fun to use a similar approach to build an adjacency matrix and add some cool visualization to the project.

I fired up Flex Builder and minutes later my computer almost crashed. I forgot how slow and resource consuming Flex Builder was, so after seconds of consideration I dropped Flex as an alternative. But the Bitmapdata idea kept reappearing in my thoughts and decided to try the Canvas element, so I moved to JavaScript. 

If you look at the demo you'll notice that there is no Canvas. This has to be with time and me being lazy... but definitely want to update this later.

Ok, stop talking... lets move on.

Data Structure
==============

After running some tests (_check out the test page_) I decided to go with a hash implementation of a graph. That is a hash dict (or associative array to go with the js concepts) in which each key represented by the user id points to a Node that contains the user details and a list of its readers. This list contains the user id's of all of those who receive the post made by the node.

One of the main advantages of this data structure is that it offers constant read times _in best case scenarios_ and allows to represent an adjacency matrix in an "optimized" way (by not wasting unnecesary space from not connected nodes as you would do with a matrix).

Algorithms
==========

Search
------

Thanks to the data structure selected the search times are constant O(1) _in best cases scenarios_ and equal as the array lookup in worst case scenarios, plus is as simple as querying the hash with the user id.

Graph Traversal
---------------

The traversal of the graph was implemented with a simple recursive algorithm which goes depth first, going deep into the branches until finds the destination or ran out of nodes.

The same algorithm allows to validate if two nodes are connected (stops at the first path found) or to search all the different path between such nodes. Also, keep track of the visited nodes to avoid infinite cycles.

Min path
--------

###Strike 1 (lazy approach)

The previous algorithm was built so it could find all the paths between two nodes. So for the Large data set with cycles the browser memory kept groing taking almost all the Ram and increasing the page ins/outs. Also, after more than hour at 90% CPU use. all the priority was taken away by the scheduler given only about 3% to work with. So, I never got to see if it reach the goal.

###Strike 2

Then, I tryed the Matrix multiplication that at some point looked better than the previous approach. This approach can be improved by using a language with matrix operation built-in or specialized hardware.

###Foul Ball

Ok, so I haven't found an acceptable aproach. So I went back to revise the graph algorithm. This time I focused on solving the memory issue and in this iteration every found path is compared agains the previous found path and only the shortest is kept.

This time, the memory usage is mostly constant but it still took a considerable amount of time to solve the problem.

### The Home Run (_tree triming_)

This improvement was kind of obvious but never considered before. If the current path length if larger than the current result there is no path that can be shortest, so why keep going?