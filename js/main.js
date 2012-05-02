/* Author:
Gustavo Saume
*/

IMYFACE = {
    common: {
        init: function()
        {
        
        }
    },
    tests: {
        init: function()
        {
            $('.nav').scrollspy({offset:10});
        }
    },
    main: {
        init: function()
        {
            // add the listeners to the data preset loaders
            $('#smallData').bind('click', function(){
                loadData('data/small_faces.dat', 'data/small_connections.dat');
                updateLoadMenu('#smallData');
            });
            
            $('#mediumData').bind('click', function(){
                loadData('data/medium_faces.dat', 'data/medium_connections.dat');
                updateLoadMenu('#mediumData');
            });
            
            $('#largeData').bind('click', function(){
                loadData('data/large_faces.dat', 'data/large_connections.dat');
                updateLoadMenu('#largeData');
            });
            
            $('#largeCycleData').bind('click', function(){
                loadData('data/large_cycle_faces.dat', 'data/large_cycle_connections.dat');
                updateLoadMenu('#largeCycleData');
            });
            
            $('#customData').bind('click', function(){
                updateLoadMenu('#customData');
                $('#customFields').removeClass('hidden');
            });
            
            $('#hideButton').bind('click', function()
            {
                $('#customFields').addClass('hidden');
                
            });
            
            $('#loadFacesButton').bind('click', function(){
                loadFaces($('#faces_data').val());
            });
            
            $('#loadConnectionsButton').bind('click', function(){
                loadConnections($('#connections_data').val());
            });
            
            // operations events
            $('#isAFace-btn').bind('click', function(){
                if (!faces)
                {
                    $('#isAFace-result').html('No data loaded');
                    $('#isAFace-time').html('');
                    return
                }
                var start = new Date().getTime();
                $('#isAFace-result').html(isAFace($('#isAFace-user').val()) ? 'User Exists!' : 'Not registered');
                $('#isAFace-time').html(new Date().getTime() - start + " milliseconds");
            });
            
            $('#isInMyFace-btn').bind('click', function(){
                if (!faces)
                {
                    $('#isInMyFace-result').html('No data loaded');
                    $('#isInMyFace-time').html('');
                    return
                }
                var orig = $('#isInMyFace-orig').val(), dest = $('#isInMyFace-dest').val();
                
                if (!faces.getFace(orig) && !faces.getFace(dest))
                {
                    $('#isInMyFace-result').html('Please validate faces');
                    $('#isInMyFace-time').html('');
                    return;
                }
                var start = new Date().getTime();
                
                $('#isInMyFace-result').html(isInMyFace(orig, dest) ? 'InMyFace!' : 'Not InMyFace');
                
                $('#isInMyFace-time').html(new Date().getTime() - start + " milliseconds");
            });
            
            $('#isOuttaMyFace-btn').bind('click', function(){
                if (!faces)
                {
                    $('#isOuttaMyFace-result').html('No data loaded');
                    $('#isOuttaMyFace-time').html('');
                    return
                }
                var orig = $('#isOuttaMyFace-orig').val(), dest = $('#isOuttaMyFace-dest').val();
                
                if (!faces.getFace(orig) || !faces.getFace(dest))
                {
                    $('#isOuttaMyFace-result').html('Please validate faces');
                    $('#isOuttaMyFace-time').html('');
                    return;
                }
                var start = new Date().getTime();
                
                $('#isOuttaMyFace-result').html(isOuttaMyFace(orig, dest) ? 'OuttaMyFace!' : 'Not OuttaMyFace');
                
                $('#isOuttaMyFace-time').html(new Date().getTime() - start + " milliseconds");
            });
            $('#inMyFacePaths-btn').bind('click', function(){
                if (!faces)
                {
                    $('#inMyFacePaths-result').html('No data loaded');
                    $('#inMyFacePaths-time').html('');
                    return
                }
                var orig = $('#inMyFacePaths-orig').val(), dest = $('#inMyFacePaths-dest').val();
                
                if (!faces.getFace(orig) || !faces.getFace(dest))
                {
                    $('#inMyFacePaths-result').html('Please validate faces');
                    $('#inMyFacePaths-time').html('');
                    return;
                }
                var start = new Date().getTime();
                
                $('#inMyFacePaths-result').html(pathToList(getInMyFacePaths(orig, dest)));
                
                $('#inMyFacePaths-time').html(new Date().getTime() - start + " milliseconds");
            });
            $('#outtaMyFacePaths-btn').bind('click', function(){
                if (!faces)
                {
                    $('#outtaMyFacePaths-result').html('No data loaded');
                    $('#outtaMyFacePaths-time').html('');
                    return
                }
                var orig = $('#outtaMyFacePaths-orig').val(), dest = $('#outtaMyFacePaths-dest').val();
                
                if (!faces.getFace(orig) || !faces.getFace(dest))
                {
                    $('#outtaMyFacePaths-result').html('Please validate faces');
                    $('#outtaMyFacePaths-time').html('');
                    return;
                }
                var start = new Date().getTime();
                
                
                $('#outtaMyFacePaths-result').html(pathToList(getOuttaMyFacePaths(orig, dest)));
                
                $('#outtaMyFacePaths-time').html(new Date().getTime() - start + " milliseconds");
            });
            $('#minFaces-btn').bind('click', function(){
                if (!faces)
                {
                    $('#minFaces-result').html('No data loaded');
                    $('#minFaces-time').html('');
                    return
                }
                var orig = $('#minFaces-orig').val(), dest = $('#minFaces-dest').val();
                
                if (!faces.getFace(orig) || !faces.getFace(dest))
                {
                    $('#minFaces-result').html('Please validate faces');
                    $('#minFaces-time').html('');
                    return;
                }
                var start = new Date().getTime();
                
                $('#minFaces-result').html(getShortestPathCount(orig, dest));
                
                $('#minFaces-time').html(new Date().getTime() - start + " milliseconds");
            });
            $('#minFaces-matrix-btn').bind('click', function(){
                if (!faces)
                {
                    $('#minFaces-result').html('No data loaded');
                    $('#minFaces-time').html('');
                    return
                }
                var orig = $('#minFaces-orig').val(), dest = $('#minFaces-dest').val();
                
                if (!faces.getFace(orig) || !faces.getFace(dest))
                {
                    $('#minFaces-result').html('Please validate faces');
                    $('#minFaces-time').html('');
                    return;
                }
                var start = new Date().getTime();
                
                $('#minFaces-result').html(getMatrixShortestPath(orig, dest));
                
                $('#minFaces-time').html(new Date().getTime() - start + " milliseconds");
            });
        }
    }
}


UTIL = {
  exec: function( controller, action ) {
    var ns = IMYFACE,
        action = ( action === undefined ) ? "init" : action;
 
    if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) {
      ns[controller][action]();
    }
  },
 
  init: function() {
    var body = document.body,
        controller = body.getAttribute( "data-controller" ),
        action = body.getAttribute( "data-action" );
 
    UTIL.exec( "common" );
    UTIL.exec( controller );
    UTIL.exec( controller, action );
  }
};
 
$( document ).ready( UTIL.init );


//----------------------------------------------------------
//
//  TESTS
//
//----------------------------------------------------------
var raw_data = '';
var repetitions = 10000;
var value = ['TLi2', 'DSarig1', 'SSadanandam1'];

function getSampleData()
{
    $.ajax({url:'data/faces_long.txt',
            success:function(data)
                {
                    $('#raw_data').val(data);
                },
           });
}

function loadLookupData()
{
    raw_data = $('#raw_data').val();
}

function stringLookup()
{
    // init the timer for the init process
    var start = new Date().getTime();
    var array = raw_data.split(',');
    var elapsed = new Date().getTime() - start;
    
    $('#array span.parse').text(elapsed.toString() + ' miliseconds');
    
    var index = 0;

    // start the timer for the search process
    start = new Date().getTime(); 

    for (var i=0; i < repetitions; i++)
    {    
        index += array.indexOf(value[i % 3]);
    }

    elapsed = new Date().getTime() - start;
    $('#array span.result').text(elapsed.toString() + ' miliseconds');
}

function hashLookup()
{
    // start the timer for the parse process
    var start = new Date().getTime();

    var array = raw_data.split(',');
    var hash = {};
    for (var i=0; i < array.length; i++)
    {
        hash = {label:array[i], value:i};
    }
    var elapsed = new Date().getTime() - start;    
    $('#hash span.parse').text(elapsed.toString() + ' miliseconds');
    var index = 0;
    
    // start the timer for the search process
    start = new Date().getTime();

    for (var i=0; i < repetitions; i++)
    {    
        index += hash[value[i % 3]];
    }

    elapsed = new Date().getTime() - start;
    $('#hash span.result').text(elapsed.toString() + ' miliseconds');
}

function binaryLookup()
{
    // start the timer for the parse process
    var start = new Date().getTime();
    var array = raw_data.split(',');
    var tree = new BinaryTree();
    
    for (var i=0; i < array.length; i++)
    {
        tree.insert(array[i], i, tree);
    }
    var elapsed = new Date().getTime() - start;
    $('#binary span.parse').text(elapsed.toString() + ' miliseconds');
    var index = 0;

    // start the timer for the search process
    start = new Date().getTime();

    for (var i=0; i < repetitions; i++)
    {    
        index += tree.searchIndex(value[i%3]);
    }

    elapsed = new Date().getTime() - start;
    $('#binary span.result').text(elapsed.toString() + ' miliseconds');
}

//--------------------------------------
// Binary Tree - http://themaingate.net/dev/javascript/a-dead-simple-javascript-binary-search-tree-bst
//--------------------------------------
var BinaryTree = function(){
    var root = null;
    
    var Node = function(){
        var node = {
            value: null,
            label: null,
            left: null,
            right: null
        };
        
        return node;
    };
    
    root = new Node();
    root.left = new Node();
    root.right = new Node();

    var insert = function (label, value, curNode)
    {
        curNode = typeof(curNode) !== 'undefined' ? curNode : root;
        
        if (curNode.value === null)
        {
            curNode.label = label;
            curNode.value = value;
            curNode.left = new Node();
            curNode.right = new Node();
        }else
        {
            insert (label, value, label < curNode.label ? curNode.left : curNode.right);
        }
    };
    
    var searchIndex = function (label, curNode)
    {
        curNode = typeof(curNode) !== 'undefined' ? curNode : root;
        
        if (!curNode.label || curNode.label == label)
        {
            return curNode.value;
        }

        searchIndex(label, label < curNode.label? curNode.left : curNode.right);
    };
    
    var value = function()
    {
        return
    }
    // declare public function
    return {insert: insert, searchIndex: searchIndex}
}

//----------------------------------------------------------
//
//  iMyFace
//
//----------------------------------------------------------
var faces;
var facesMatrix;

// DataStructure
//--------------------------------------
var FacesData = function()
{
    var faces = {};
    
    var Face = function()
    {
        var face = {name: null,
                    lastName: null,
                    password: null,
                    id: null,
                    index: null,
                    posts: null,
                    timeline: null,
                    readers:[]};
        return face;
    }
    
    var loadFaces = function (facesData)
    {
        var facesList = facesData.split('\n');
        
        var length = facesList.length, i, faceData;
        for (i=0; i<length; i++)
        {
            faceData = (facesList[i]).split('|');
            if (faceData.length === 4)
                loadFace(faceData[0], faceData[1], faceData[2], faceData[3], i);
        }
    }
    
    var loadFace = function(name, lastName, id, password, index)
    {
        var face = new Face();
        face.name = $.trim(name);
        face.lastName = $.trim(lastName);
        face.id = $.trim(id);
        face.password = $.trim(password);
        face.index = index;
        
        faces[id] = face;
    }
    
    var facesCount = function()
    {
        var length = 0, key;
        for (key in faces) {
            if (faces.hasOwnProperty(key)) length++;
        }
        return length;
    };

    var loadConnections = function (connectionsData)
    {
        var connections = connectionsData.split('\n');
        var length = connections.length, i, connection;
        
        for (i=0; i < length; i++)
        {
            connection = connections[i].split(" ");
            
            if (connection[1] == "OuttaMyFace")
            {
                createConnection(connection[0], connection[2]);
            }else
            {
                createConnection(connection[2], connection[0]);
            }
        }
    }
    
    var createConnection = function(from, to)
    {
        var to = $.trim(to);
        var from_face = getFace($.trim(from));
        var to_face = getFace(to);
        
        if (!from_face || !to_face)
        {
            // log error
            return;
        }
        
        from_face.readers.push(to);
    }
    
    var loadPosts = function ()
    {
    
    }
    
    
    var getFace = function(id)
    {
        return faces[id];
    }
    
    var getPaths = function(nodeId, goalId, getAll, path, results, getMin)
    {
        // Append the current node to the traversed path
        var currentPath = path.slice()
        currentPath.push(nodeId);
        var currentNode = getFace(nodeId);

        // if we are at the goal, we add the path to the results
        // OR if the goal is within our readers (to avoid going deep unnecessarily)
        if (nodeId == goalId || currentNode.readers.indexOf(goalId) > -1)
        {
            // always add if we're not looking for the min path, if we are,
            // we add if the new found path is shortest than the prev found path
            if (!getMin || results.length == 0 || (results[0].length > currentPath.length))
                results.push(currentPath);
            return;
        }
        
        if (getMin && results.length > 0 && results[0].length <= currentPath.length)
        {
            // if its the min path and the current path if bigger than a
            // found path we can stop
            return;
        }

        var childCount = currentNode.readers.length;
        var child, childId;
        // Go through all the children of the node
        // and recursively call getPath with each child
        // until the goal is found 
        for (var i=0; i < childCount; i++)
        {
            // continue only if the current child hasn't
            // been evaluated in the current path
            childId = currentNode.readers[i];
            if (currentPath.indexOf(childId) == -1)
            {
                // navigate through each child
                getPaths(childId, goalId, getAll, currentPath, results, getMin);
                
                // if we only need to get one result (to see if they're connected)
                // and already found one path we return
                // if not we continue until all path are covered
                if (!getAll && results.length > 0)
                {
                    return;
                }
            }
        }
    }
    
    return {loadFaces: loadFaces,
            loadConnections: loadConnections,
            loadPosts: loadPosts,
            getFace: getFace,
            getPaths: getPaths,
            facesCount: facesCount};
}

var FacesMatrix = function()
{
    var connections = [];
    var map = {};

    var Face = function()
    {
        var face = {name: null,
                    lastName: null,
                    password: null,
                    id: null,
                    index: null,
                    posts: null,
                    timeline: null,};
        return face;
    }

    var loadFaces = function(facesData)
    {
        var facesList = facesData.split('\n');
        
        var length = facesList.length, i, j, faceFriends;

        // init two dimensional array
        for (i=0; i<length; i++)
        {
            faceFriends = [];
            for (j=0; j<length; j++)
            {
                faceFriends.push(0);
            }
            connections.push(faceFriends);

            faceData = (facesList[i]).split('|');
            // create the face index in the matrix
            var face = new Face();
            face.name = $.trim(faceData[0]);
            face.lastName = $.trim(faceData[1]);
            face.id = $.trim(faceData[2]);
            face.password = $.trim(faceData[3]);
            face.index = i;
            
            map[face.id] = face;
        }
    }

    var loadConnections = function(connectionsData)
    {
        var connections = connectionsData.split('\n');
        var length = connections.length, i, connection;
        
        for (i=0; i < length; i++)
        {
            connection = connections[i].split(" ");
            
            if (connection[1] == "OuttaMyFace")
            {
                createConnection(connection[0], connection[2]);
            }else
            {
                createConnection(connection[2], connection[0]);
            }
        }
    }

    var createConnection = function(from, to)
    {
        var from_face = getFace($.trim(from));
        var to_face = getFace($.trim(to));
        
        if (!from_face || !to_face)
        {
            // log error
            return;
        }
        
        connections[from_face.index][to_face.index] = 1;
    }

    var getFace = function(id)
    {
        return map[id];
    }

    var getMinPath = function(orig, dest)
    {
        var indexOrig = getFace(orig).index;
        var indexDest = getFace(dest).index;

        var length = connections.length, 
            i,
            resultMatrix = connections,
            compareMatrix = connections;

        // validate if there directly connected
        if (connections[indexOrig][indexDest] > 0)
            return 0;

        // init matrix
        for (i=0; i<length; i++)
        {
            resultMatrix = multiplyMatrix(resultMatrix);
            if (resultMatrix[indexOrig][indexDest] > 0)
            {
                return i+1;
            }

            if (compareMatrices(resultMatrix, compareMatrix))
            {
                return -1;
            }
        }
        console.log('MIN REPS: '+i);
        return -1;
    }

    function multiplyMatrix(matrix)
    {
        var length = matrix.length, i, j, k;
        var resultMatrix = getEmptyMatrix(length);

        for (i=0;i<length;i++)
        {
            for (j=0; j<length;j++)
            {
                for (k=0; k<length; k++)
                {
                    resultMatrix[i][j] = resultMatrix[i][j] + matrix[i][k] * matrix[k][j];
                }
            }
        }
        return resultMatrix;
    }

    function getEmptyMatrix(length)
    {
        var result = [], i, j, column;
        for (i=0; i<length; i++)
        {   
            column = [];
            for (j=0; j<length;j++)
            {
                column.push(0);
            }
            result.push(column);
        }
        return result;
    }

    function compareMatrices(matrixA, matrixB)
    {
        return matrixA.join() == matrixB.join();
    }

    return {
        loadFaces: loadFaces,
        loadConnections: loadConnections,
        getMinPath: getMinPath,
    }
}


// page Methods
//--------------------------------------
function loadFaces(data)
{
    faces = new FacesData();
    faces.loadFaces(data);

    facesMatrix = new FacesMatrix();
    facesMatrix.loadFaces(data);

    $('#connections button.disabled').removeClass('disabled');
}

function loadConnections(connections)
{
    faces.loadConnections(connections);

    facesMatrix.loadConnections(connections);
    $('#posts button.desabled').removeClass('disabled');
}

function isAFace(id)
{
    return faces.getFace(id) ? true : false;
}

function isInMyFace(myId, faceId)
{
    var results = new Array();

    faces.getPaths(faceId, myId, false, [], results, false);
    
    return results.length > 0 ? true : false; 
}

function getInMyFacePaths(myId, faceId)
{
    var results = new Array();
    faces.getPaths(faceId, myId, true, [], results, false);
    
    return results; 
}

function isOuttaMyFace(myId, faceId)
{
     var results = new Array();
    faces.getPaths(myId, faceId, false, [], results, false);
    
    return results.length > 0 ? true : false; 
}

function getOuttaMyFacePaths(myId, faceId)
{
    var results = new Array();
    faces.getPaths(myId, faceId, true, [], results, false);
    
    return results;
}

function getShortestPath(myId, faceId)
{
     var results = new Array();
    faces.getPaths(myId, faceId, true, [], results, true);
    
    var length = results.length;
    var shortestPathLength = Number.MAX_VALUE,
        shortestPath = [],
        currentResult;
    for (var i=0; i < length; i++)
    {
        currentResult = results[i];
        if (currentResult.length < shortestPathLength)
        {
            shortestPathLength = currentResult.length;
            shortestPath = currentResult;
        }
    }
    return shortestPath;
}

function getShortestPathCount(myId, faceId)
{
    return getShortestPath(myId, faceId).length -1;
}

function getMatrixShortestPath(myId, faceId)
{
    var minPath = facesMatrix.getMinPath(myId, faceId)
    return minPath == -1 ? "No connection" : minPath + " x Faces";
}

function loadData(facesFile, connectionsFile)
{
    // fetch faces file
    $.ajax({url:facesFile,
        success:function(data)
        {
            loadFaces(data);
            // fetch connections
            $.ajax({url:connectionsFile,
                    success:function(data){
                        loadConnections(data);
                    }
            }); 
        },
    });
}

function updateLoadMenu(activeItem)
{
    $(activeItem).parents('.nav').children('.active').removeClass('active');
    $(activeItem).parent().addClass('active');
}

function pathToList(paths)
{
    if (paths.length == 0)
    {
        return "No path was found."
    }
    var result = ["</br><ul>"],
        i,
        j=1,
        pathsCount = paths.length;
    
    for (i=0; i < pathsCount; i++)
    {
        result[j++] = "<li>";
        result[j++] = paths[i].join(",");
        result[j++] = "</li>";
    }
    
    result.push("</ul>");
    return result.join("");
}