export const visualizers = [
  {
    id: 'os',
    name: 'Operating Systems',
    visualizers: [
      {
        id: 'process-scheduling',
        name: 'Process Scheduling',
        description: 'Visualize different CPU scheduling algorithms like FCFS, SJF, and Round Robin',
        tags: ['scheduling', 'algorithms', 'CPU'],
        link: '/visualizer/process-scheduling'
      },
      {
        id: 'memory-management',
        name: 'Memory Management',
        description: 'Explore paging, segmentation and virtual memory concepts',
        tags: ['memory', 'paging', 'virtual-memory'],
        link: '/visualizer/memory-management'
      },
      {
        id: 'deadlock-detection',
        name: 'Deadlock Detection',
        description: 'Understand deadlock conditions and detection algorithms',
        tags: ['deadlock', 'synchronization'],
        link: '/visualizer/deadlock-detection'
      },
      {
        id: 'page-replacement',
        name: 'Page Replacement',
        description: 'Visualize algorithms like LRU, FIFO, and Optimal page replacement',
        tags: ['memory', 'algorithms', 'paging'],
        link: '/visualizer/page-replacement'
      },
      {
        id: 'disk-scheduling',
        name: 'Disk Scheduling',
        description: 'Explore algorithms like SCAN, C-SCAN, and SSTF',
        tags: ['disk', 'scheduling', 'algorithms'],
        link: '/visualizer/disk-scheduling'
      },
      {
        id: 'process-synchronization',
        name: 'Process Synchronization',
        description: 'Understand semaphores, monitors, and critical sections',
        tags: ['synchronization', 'concurrency'],
        link: '/visualizer/process-synchronization'
      },
      {
        id: 'file-allocation',
        name: 'File Allocation',
        description: 'Visualize contiguous, linked, and indexed allocation methods',
        tags: ['file-system', 'storage'],
        link: '/visualizer/file-allocation'
      },
      {
        id: 'bankers-algorithm',
        name: 'Banker\'s Algorithm',
        description: 'Understand deadlock avoidance in resource allocation',
        tags: ['deadlock', 'algorithms', 'safety'],
        link: '/visualizer/bankers-algorithm'
      },
      {
        id: 'cpu-cache',
        name: 'CPU Cache',
        description: 'Explore cache mapping techniques and policies',
        tags: ['cache', 'memory', 'performance'],
        link: '/visualizer/cpu-cache'
      },
      {
        id: 'process-threads',
        name: 'Processes & Threads',
        description: 'Compare processes and threads in modern operating systems',
        tags: ['processes', 'threads', 'concurrency'],
        link: '/visualizer/process-threads'
      }
    ]
  },
  {
    id: 'networks',
    name: 'Computer Networks',
    visualizers: [
      {
        id: 'tcp-congestion',
        name: 'TCP Congestion Control',
        description: 'Visualize TCP congestion control mechanisms and algorithms',
        tags: ['TCP', 'networking', 'algorithms'],
        link: '/visualizer/tcp-congestion'
      },
      {
        id: 'routing-algorithms',
        name: 'Routing Algorithms',
        description: 'Explore different network routing strategies and protocols',
        tags: ['routing', 'algorithms'],
        link: '/visualizer/routing-algorithms'
      },
      {
        id: 'http-https',
        name: 'HTTP/HTTPS',
        description: 'Compare HTTP and HTTPS protocols and their security aspects',
        tags: ['http', 'https', 'security'],
        link: '/visualizer/http-https'
      },
      {
        id: 'dns-lookup',
        name: 'DNS Lookup',
        description: 'Visualize the domain name resolution process',
        tags: ['DNS', 'networking', 'protocols'],
        link: '/visualizer/dns-lookup'
      },
      {
        id: 'tcp-udp',
        name: 'TCP vs UDP',
        description: 'Compare TCP and UDP transport layer protocols',
        tags: ['TCP', 'UDP', 'transport-layer'],
        link: '/visualizer/tcp-udp'
      },
      {
        id: 'network-topologies',
        name: 'Network Topologies',
        description: 'Explore different network topologies and their characteristics',
        tags: ['topology', 'networking', 'design'],
        link: '/visualizer/network-topologies'
      },
      {
        id: 'subnetting',
        name: 'IP Subnetting',
        description: 'Learn and practice IP subnetting techniques',
        tags: ['IP', 'networking', 'subnetting'],
        link: '/visualizer/subnetting'
      },
      {
        id: 'vpn-tunneling',
        name: 'VPN & Tunneling',
        description: 'Understand how VPNs and tunneling protocols work',
        tags: ['VPN', 'security', 'tunneling'],
        link: '/visualizer/vpn-tunneling'
      },
      {
        id: 'network-security',
        name: 'Network Security',
        description: 'Explore encryption, firewalls, and security protocols',
        tags: ['security', 'encryption', 'firewall'],
        link: '/visualizer/network-security'
      },
      {
        id: 'osi-model',
        name: 'OSI Model',
        description: 'Visualize the seven layers of the OSI model',
        tags: ['OSI', 'networking', 'protocols'],
        link: '/visualizer/osi-model'
      }
    ]
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    visualizers: [
      {
        id: 'sorting-algorithms',
        name: 'Sorting Algorithms',
        description: 'Visualize and compare various sorting algorithms',
        tags: ['sorting', 'algorithms'],
        link: '/visualizer/sorting-algorithms'
      },
      {
        id: 'graph-traversal',
        name: 'Graph Traversal',
        description: 'Explore BFS, DFS and other graph traversal techniques',
        tags: ['graphs', 'algorithms', 'traversal'],
        link: '/visualizer/graph-traversal'
      },
      {
        id: 'dynamic-programming',
        name: 'Dynamic Programming',
        description: 'Explore dynamic programming concepts and algorithms',
        tags: ['algorithms', 'optimization'],
        link: '/visualizer/dynamic-programming'
      },
      {
        id: 'binary-search-tree',
        name: 'Binary Search Tree',
        description: 'Visualize operations on binary search trees',
        tags: ['trees', 'data-structures', 'algorithms'],
        link: '/visualizer/binary-search-tree'
      },
      {
        id: 'hashing',
        name: 'Hashing',
        description: 'Understand hash functions and collision resolution',
        tags: ['hashing', 'data-structures', 'algorithms'],
        link: '/visualizer/hashing'
      },
      {
        id: 'greedy-algorithms',
        name: 'Greedy Algorithms',
        description: 'Explore greedy algorithm design techniques',
        tags: ['algorithms', 'optimization'],
        link: '/visualizer/greedy-algorithms'
      },
      {
        id: 'divide-conquer',
        name: 'Divide & Conquer',
        description: 'Understand divide and conquer strategy',
        tags: ['algorithms', 'recursion'],
        link: '/visualizer/divide-conquer'
      },
      {
        id: 'shortest-path',
        name: 'Shortest Path',
        description: 'Visualize Dijkstra\'s and Bellman-Ford algorithms',
        tags: ['graphs', 'algorithms', 'pathfinding'],
        link: '/visualizer/shortest-path'
      },
      {
        id: 'minimum-spanning-tree',
        name: 'Minimum Spanning Tree',
        description: 'Explore Kruskal\'s and Prim\'s algorithms',
        tags: ['graphs', 'algorithms', 'trees'],
        link: '/visualizer/minimum-spanning-tree'
      },
      {
        id: 'backtracking',
        name: 'Backtracking',
        description: 'Understand backtracking through problems like N-Queens',
        tags: ['algorithms', 'recursion', 'problem-solving'],
        link: '/visualizer/backtracking'
      }
    ]
  }
];