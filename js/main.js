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
               
        }
    }
}


UTIL = {
  exec: function( controller, action ) {
    var ns = SITENAME,
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
           })
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
            loadFace(faceData[0], faceData[1], faceData[2], faceData[3], i);
        }
    }
    
    var loadFace = function(name, lastName, id, password, index)
    {
        face = new Face();
        face.name = name;
        face.lastName = lastName;
        face.id = id;
        face.password = password;
        face.index = index;
        
        faces [id] = face;
    }
    
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
        from_face = getFace(from)
        to_face = getFace(to)
        
        if (!from_face || to_face)
        {
            // log error
            return
        }
        
        from_face.fwds.push(to);
    }
    
    var loadPosts = function ()
    {
    
    }
    
    
    var getFace = function(id)
    {
        return faces[id];
    }
    
    var getPaths = function(nodeId, goalId, getAll, path, results)
    {
        // Append the current node to the traversed path
        currentPath = path;
        currentPath.append(nodeId);
        
        // if we are at the goal, we add the path to the results
        if (nodeId == goalId)
        {
            results.append(currentPath);
            return;
        }
        
        currentNode = getFace(nodeId)
        var childCount = currentNode.readers;
        var child;
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
                getPaths(childId, goaded, getAll, path, results);
                
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
            getPaths: getPaths};
}

var faces;

// page Methods
//--------------------------------------
function loadFaces()
{
    faces = new FacesData();
    faces.loadFaces($('#faces textarea').val());
    $('#connections button.disabled').removeClass('disabled');
}

function loadConnections()
{
    faces.loadConnections($('#connections textarea').val());
    $('#posts button.desabled').removeClass('disabled');
}

function isAFace(id)
{
    return faces.getFace(id) ? true : false;
}

function isInMyFace(myId, faceId)
{
    results = new Array();
    faces.getPaths(faceId, myId, false, [], results);
    
    return results.length > 0 ? true : false; 
}

function getInMyFacePaths(myId, faceId)
{
    results = new Array();
    faces.getPaths(faceId, myId, true, [], results);
    
    return results; 
}

function isOutOfMyFace(myId, faceId)
{
    results = new Array();
    faces.getPaths(myId, faceId, false, [], results);
    
    return results.length > 0 ? true : false; 
}

function getOutOfMyFacePaths(myId, faceId)
{
    results = new Array();
    faces.getPaths(myId, faceId, true, [], results);
    
    return results.length > 0 ? true : false;
}