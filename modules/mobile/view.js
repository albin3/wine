// mobile view
var model = require('./model');

exports.index = function(req, res) {
  res.render('mobile/index');
};

exports.test = function(req, res) {
  res.render('mobile/test');
};

exports.road = function(req, res) {
  res.render('mobile/road');
};

exports.around = function(req, res) {
  res.render('mobile/around');
};

exports.shake = function(req, res) {
  res.render('mobile/shake');
};

exports.getdata= function(req, res) {
  var ret = 
  {
    first_facts: [
      "Now see how long you can go without touching your phone."
      ],
    water_facts: [
    {
      fact: "Since 1990, thanks to the work of UNICEF and its partners, more than 2 billion people have gained access to clean drinking water.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "Women carry two-thirds of the burden in drinking-water collection.",
      type: "post",
      extra: "Keep going to help out!"
    },
    {
      fact: "Letting the tap run while brushing your teeth uses enough water to fill two collapsible water buckets for a child in need.",
      type: "pre",
      extra: "Here's a fact:"
    },
    {
      fact: "UNICEF has worked in more than 100 countries around the world, improving access to safe water and sanitation.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "In Africa alone, people spend 40 billion hours every year just walking to collect water.",
      type: "post",
      extra: "Keep going to help out!"
    },
    {
      fact: "400 million kids worldwide, more than five times the number of American children, have their education disrupted due to unclean water.",
      type: "post",
      extra: "Keep going to help out!"
    },
    {
      fact: "Poor water and sanitation results in economic losses estimated at U.S. $260 billion annually in developing countries, or 1.5% of their GDP.",
      type: "pre",
      extra: "Here's a fact:"
    },
    {
      fact: "Today, more people have access to mobile phones than toilets.",
      type: "pre",
      extra: "Did you know?"
    },
    {
      fact: "Today, 768 million people, more than two times the U.S. population, live without access to improved drinking water sources.",
      type: "post",
      extra: "Keep going to help out!"
    },
    {
      fact: "The global economic return on water spending is $2 per dollar invested.",
      type: "pre",
      extra: "Did you know?"
    },
    {
      fact: "After the 2010 earthquake in Haiti, UNICEF helped provide new latrines and hand-washing stations to 198 schools.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "After the Libyan Civil War left 4 million people without access to clean water, UNICEF delivered emergency supplies to those in need.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "During Libya's civil war, UNICEF procured 11 million liters of bottled water for half a million people.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "UNICEF uses water purification tablets. One tablet can purify more than a gallon of contaminated water.",
      type: "",
      extra: ""
    },
    {
      fact: "UNICEF uses oral rehydration salts. One packet can reverse the deadly loss of essential fluids to save a child's life.",
      type: "",
      extra: ""
    },
    {
      fact: "In many countries, more than half the primary schools do not have access to safe drinking water.",
      type: "pre",
      extra: "Did you know?"
    },
    {
      fact: "Every day, girls around the world are kept out of school due to having to fetch water from long distances.",
      type: "post",
      extra: "Keep going to help out!"
    },
    {
      fact: "Carrying heavy bottles of water for long distances is the main cause of injuries for young girls in rural areas.",
      type: "pre",
      extra: "Here's a fact:"
    },
    {
      fact: "The majority of people living without access to clean water represent the poorest of the poor living in sub-Saharan Africa, Asia and Oceania.",
      type: "pre",
      extra: "Here's a fact:"
    },
    {
      fact: "Over 80% of people living without access to clean drinking water live in rural areas.",
      type: "pre",
      extra: "Did you know?"
    },
    {
      fact: "Only 63% of people living in sub-Saharan Africa have access to an improved water source.",
      type: "pre",
      extra: "Here's a fact:"
    },
    {
      fact: "Recent improvements in water facilities in Bangladesh schools have resulted in an 11% increase in girls' enrollment.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "In 2012, UNICEF helped over 17 million people maintain or gain access to potable water supplies in a total of 72 countries.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "For the first time ever, more than half of schools in the poorest countries have access to water facilities.",
      type: "pre",
      extra: "Here's a fact:"
    },
    {
      fact: "Two weeks after Typhoon Haiyan hit the Philippines, UNICEF helped restore access to clean water for over 200,000 people in Tacloban City.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "Last year, UNICEF delivered 71 million sachets of oral rehydration salts, helping children in need.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "Last year, UNICEF provided safe water for 18.8 million people in emergencies.",
      type: "post",
      extra: "Right now, you're helping too!"
    },
    {
      fact: "One full laundry cycle uses enough water to fill six collapsible water buckets for children.",
      type: "pre",
      extra: "Here's a fact:"
    },
    {
      fact: "Running a full dishwasher cycle uses enough water to almost fill two collapsible water buckets for children.",
      type: "pre",
      extra: "Did you know?"
    },
    {
      fact: "75% of the people collecting water are women and children.",
      type: "pre",
      extra: "Here's a fact:"
    },
    {
      fact: "A five-minute shower uses the same amount of water that could fill up to nine collapsible water buckets for a child in need.",
      type: "pre",
      extra: "Did you know?"
    },
    {
      fact: "In 2012, UNICEF and its partners constructed gender-sensitive and child-friendly sanitation, washing and water facilities for over 4 million children.",
      type: "pre",
      extra: "Here's a fact:"
    },
    {
      fact: "UNICEF leads the global emergency response to water and sanitation needs in emergencies.",
      type: "pre",
      extra: "Did you know?"
    },
    {
      fact: "When water's available within a 15-minute walk, instead of more than an hour's walk, school attendance in Tanzania increases by 12%.",
      type: "pre",
      extra: "Here's a fact:"
    }
    ],
      time_facts: [
        "You've gone for <USER CURRENT TIME>. In some countries kids can walk up to 3 hours just to get water.",
      "You've gone for <USER CURRENT TIME>. In villages where water systems are in place the walk for water is around 15 minutes."
        ],
      remember_facts: [
        "Remember, for every 10 minutes you last without your phone, you will unlock a day of clean water."
        ],
      competitive_facts: [
        "Today's record time is <TODAY RECORD TIME>",
      "This week's record time is <WEEK RECORD TIME>",
      "This month's record time is <MONTH RECORD TIME>",
      "The all-time record is <ALLTIME RECORD TIME>",
      "People have gone an average time of <AVERAGE TOTAL TIME> without their phone"
        ],
      location_stats: [
      {
        stat: "Right now, there are <NUMBER> people going without their phones in <STATE>",
        type: "active",
        location: "state"
      },
      {
        stat: "The record time in <STATE> is <NUMBER>",
        type: "record",
        location: "user_state"
      },
      {
        stat: "<STATE> is the leading state in total time spent away from their phones.",
        type: "leading",
        location: "state"
      },
      {
        stat: "<STATE> is in <NUMBER> place for total time spent without phones.",
        type: "placement",
        location: "user_state"
      },
      {
        stat: "Right now, there are <NUMBER> people going without their phones in <CITY>",
        type: "active",
        location: "nearest_city"
      },
      {
        stat: "The record time in <CITY> is <NUMBER>",
        type: "record",
        location: "nearest_city"
      },
      {
        stat: "<CITY> is the leading city in total time spent away from their phones.",
        type: "leading",
        location: "city"
      }
    ],
      social_stats: [
      {
        stat: "While people on Instagram have posted <X #food photos> you've helped provide water instead.",
        rate: "12",
        image: "food.png"
      },
      {
        stat: "While people on Instagram have posted <X #selfie photos> you’ve helped provide water instead.",
        rate: "12",
        image: "selfie.png"
      },
      {
        stat: "While people on Instagram have posted <X #cat photos> you’ve helped provide water instead.",
        rate: "1",
        image: "cat.png"
      },
      {
        stat: "While people on Instagram have posted <X #nofilter photos> you’ve helped provide water instead.",
        rate: "12",
        image: "nofilter.png"
      },
      {
        stat: "<X photos> have been posted to Facebook while you've been without your phone.",
        rate: "4051",
        image: "fb-photos.png"
      },
      {
        stat: "<X Likes> have been posted to Facebook while you've been without your phone.",
        rate: "52083",
        image: "fb-likes.png"
      },
      {
        stat: "<X texts> have been sent in the time you've been without your phone.",
        rate: "69444",
        image: "text-messages.png"
      },
      {
        stat: "<X smiley faces> have been sent in the time you've been without your phone.",
        rate: "2797",
        image: "smiley-faces.png"
      },
      {
        stat: "<X emails> have been sent in the time you've been without your phone.",
        rate: "1157407",
        image: "emails.png"
      },
      {
        stat: "<X cell phone calls> have been made in the time you've been without your phone.",
        rate: "18893",
        image: "calls.png"
      }
    ],
      encouragement_facts: [
        "<Keep going!> <X more minutes> can raise enough for one day of water for a child in need.",
      "<Keep going!> <X more minutes> can raise enough for 11 water purification tablets.",
      "<Keep going!> <X more minutes> can raise enough for a family of 5 for one day.",
      "<Keep going!> <X more minutes> can raise enough for a week of water for a child in need.",
      "<Keep going!> <X more minutes> can raise enough for 2 oral rehydration packets for a child in need.",
      "<Keep going!> <X more minutes> can raise enough for 45 water purification tablets for children in need.",
      "<Keep going!> <X more minutes> can raise enough to protect up to 15 children from worm infestation.",
      "<Keep going!> <X more minutes> can raise enough to protect up to 20 children from worm infestation.",
      "<Keep going!> <X more minutes> can raise enough for 10 packets of oral rehydration salts.",
      "<Keep going!> <X more minutes> can raise enough for one-tenth of a lifesaving water kit for one family."
        ],
      thank_you_facts: [
      {
        fact: "UNICEF Tap Project thanks you for going without your phone to help provide clean water for children in need.",
        type: "pre",
        extra: "Keep going!"
      }
    ],
      milestone_generic: {
        type: "water",
        img_dir: "water",
        text: "That's enough funding for one day of water for a child in need."
      },
      milestone_img_dir: "/api/get-milestone-image/",
      milestones: {
        10: {
              type: "child",
              img_dir: "child",
              text: "That's enough funding for one day of water for a child in need."
            },
        30: {
              type: "tablet",
              img_dir: "tablet",
              text: "That's enough funding for 11 water purification tablets for children in need."
            },
        50: {
              type: "family",
              img_dir: "family",
              text: "That's enough funding for a family of 5 for one day."
            },
        60: {
              type: "water",
              img_dir: "water",
              text: "That's enough funding for 22 water purification tablets for children in need."
            },
        70: {
              type: "water",
              img_dir: "water",
              text: "That's enough funding for a week of water for a child in need."
            },
        80: {
              type: "hydration",
              img_dir: "hydration",
              text: "That's enough funding for 2 oral rehydration packets for a child in need."
            },
        120: {
               type: "tablet",
               img_dir: "tablet",
               text: "That's enough funding for 45 water purification tablets for children in need."
             },
        170: {
               type: "child",
               img_dir: "child",
               text: "That’s enough funding to protect up to 15 children from worm infestation."
             },
        230: {
               type: "tablet",
               img_dir: "tablet",
               text: "That's enough funding to protect up to 20 children from worm infestation."
             },
        400: {
               type: "tablet",
               img_dir: "tablet",
               text: "That's funding for 10 packets of oral rehydration salts."
             },
        520: {
               type: "family",
               img_dir: "family",
               text: "That's funding for one-tenth of a lifesaving water kit for one family."
             }
      },
      results_copy: [
      {
        id: "A",
        text: "Make even more of a difference!",
        button_text: "$5 = 200 more days"
      },
      {
        id: "B",
        text: "Just $5 can provide 200 days of clean water.",
        button_text: "Add more days"
      },
      {
        id: "C",
        text: "Send one text message to make even more of a difference.",
        button_text: "Supply more days"
      }
    ],
      records: {
        top_donation_all_time: "998463",
        top_donation_month: "998463",
        top_donation_week: "998463",
        top_donation_today: "402874",
        total_today: 4113963,
        total_all_time: 15869936473,
        avg_total: 3601,
        total_visits: 6257671,
        highestVisitCount_state: 376753,
        highestVisitName_state: "California",
        highestVisitCount_city: 0,
        highestVisitName_city: "Seoul",
        google_analytics_render_time: "2.8636219501495s",
        stats_render_time: "13.425702095032s",
        cached: false,
        updated_at: "2014-04-10 02:10:14"
      },
      real_time: {
                   totalactiveVisitors: 111,
                   locations: [
                     [
                     "South Korea",
                   "zz",
                   "Seoul",
                   "37.566536",
                   "126.977974",
                   "18"
                     ],
                   [
                     "United States",
                   "Illinois",
                   "Chicago",
                   "41.878113",
                   "-87.629799",
                   "3"
                     ],
                   [
                     "Australia",
                   "New South Wales",
                   "Sydney",
                   "-33.867489",
                   "151.206985",
                   "2"
                     ],
                   [
                     "Canada",
                   "British Columbia",
                   "Victoria",
                   "48.428421",
                   "-123.365646",
                   "2"
                     ],
                   [
                     "Canada",
                   "Ontario",
                   "Toronto",
                   "43.653225",
                   "-79.383186",
                   "2"
                     ],
                   [
                     "Japan",
                   "Tokyo",
                   "Shibuya",
                   "35.664036",
                   "139.698212",
                   "2"
                     ],
                   [
                     "South Korea",
                   "zz",
                   "Daegu",
                   "35.871437",
                   "128.601440",
                   "2"
                     ],
                   [
                     "United States",
                   "Arizona",
                   "Tucson",
                   "32.221745",
                   "-110.926476",
                   "2"
                     ],
                   [
                     "United States",
                   "California",
                   "Los Angeles",
                   "34.052235",
                   "-118.243683",
                   "2"
                     ],
                   [
                     "United States",
                   "New York",
                   "New York",
                   "40.714352",
                   "-74.005974",
                   "2"
                     ],
                   [
                     "United States",
                   "Texas",
                   "San Antonio",
                   "29.424122",
                   "-98.493622",
                   "2"
                     ],
                   [
                     "Australia",
                   "Queensland",
                   "Gold Coast",
                   "-28.017262",
                   "153.425705",
                   "1"
                     ],
                   [
                     "Australia",
                   "South Australia",
                   "Adelaide",
                   "-34.928619",
                   "138.599960",
                   "1"
                     ],
                   [
                     "Canada",
                   "British Columbia",
                   "Kelowna",
                   "49.887951",
                   "-119.496010",
                   "1"
                     ],
                   [
                     "Canada",
                   "British Columbia",
                   "Vancouver",
                   "49.261227",
                   "-123.113930",
                   "1"
                     ],
                   [
                     "Canada",
                   "Nova Scotia",
                   "Halifax",
                   "44.648903",
                   "-63.575333",
                   "1"
                     ],
                   [
                     "Canada",
                   "Ontario",
                   "Guelph",
                   "43.544807",
                   "-80.248169",
                   "1"
                     ],
                   [
                     "Canada",
                   "Ontario",
                   "London",
                   "42.986950",
                   "-81.243172",
                   "1"
                     ],
                   [
                     "Canada",
                   "Saskatchewan",
                   "Unity",
                   "52.443729",
                   "-109.158325",
                   "1"
                     ],
                   [
                     "China",
                   "Beijing",
                   "Beijing",
                   "39.904030",
                   "116.407524",
                   "1"
                     ],
                   [
                     "China",
                   "Liaoning",
                   "Dalian",
                   "38.914001",
                   "121.614685",
                   "1"
                     ],
                   [
                     "Ecuador",
                   "Guayas",
                   "Guayaquil",
                   "-2.203816",
                   "-79.897453",
                   "1"
                     ],
                   [
                     "Egypt",
                   "Cairo Governorate",
                   "Cairo",
                   "30.044418",
                   "31.235712",
                   "1"
                     ],
                   [
                     "Japan",
                   "Miyazaki",
                   "Miyazaki",
                   "31.907673",
                   "131.420242",
                   "1"
                     ],
                   [
                     "Japan",
                   "Okinawa",
                   "Naha",
                   "26.212313",
                   "127.679153",
                   "1"
                     ],
                   [
                     "Japan",
                   "Saitama",
                   "Saitama",
                   "35.861729",
                   "139.645477",
                   "1"
                     ],
                   [
                     "Malaysia",
                   "Johor",
                   "Johor Bahru",
                   "1.463430",
                   "103.754715",
                   "1"
                     ],
                   [
                     "Mexico",
                   "Federal District",
                   "Mexico City",
                   "19.432608",
                   "-99.133209",
                   "1"
                     ],
                   [
                     "Netherlands",
                   "Groningen",
                   "Groningen",
                   "53.219383",
                   "6.566502",
                   "1"
                     ],
                   [
                     "Netherlands",
                   "Overijssel",
                   "Olst",
                   "52.337788",
                   "6.114125",
                   "1"
                     ],
                   [
                     "Qatar",
                   "zz",
                   "zz",
                   "0.000000",
                   "0.000000",
                   "1"
                     ],
                   [
                     "Singapore",
                   "zz",
                   "zz",
                   "0.000000",
                   "0.000000",
                   "1"
                     ],
                   [
                     "South Korea",
                   "Chungcheongnam-do",
                   "Cheonan-si",
                   "36.815128",
                   "127.113892",
                   "1"
                     ],
                   [
                     "South Korea",
                   "Gyeonggi-do",
                   "Anyang-si",
                   "37.394253",
                   "126.956825",
                   "1"
                     ],
                   [
                     "South Korea",
                   "Gyeonggi-do",
                   "Seongnam-si",
                   "37.444916",
                   "127.138870",
                   "1"
                     ],
                   [
                     "South Korea",
                   "Gyeongsangbuk-do",
                   "Gumi-si",
                   "36.119484",
                   "128.344574",
                   "1"
                     ],
                   [
                     "South Korea",
                   "Jeollabuk-do",
                   "Jeongeup-si",
                   "35.569885",
                   "126.855896",
                   "1"
                     ],
                   [
                     "South Korea",
                   "zz",
                   "Busan",
                   "35.179554",
                   "129.075638",
                   "1"
                     ],
                   [
                     "South Korea",
                   "zz",
                   "Gwangju",
                   "35.159546",
                   "126.852592",
                   "1"
                     ],
                   [
                     "Taiwan",
                   "zz",
                   "Kaohsiung City",
                   "23.010872",
                   "120.666008",
                   "1"
                     ],
                   [
                     "Taiwan",
                   "zz",
                   "New Taipei City",
                   "24.915712",
                   "121.673935",
                   "1"
                     ],
                   [
                     "Turkey",
                   "Izmir Province",
                   "Izmir",
                   "38.418850",
                   "27.128719",
                   "1"
                     ],
                   [
                     "United Kingdom",
                   "England",
                   "Ashford",
                   "51.146465",
                   "0.875019",
                   "1"
                     ],
                   [
                     "United Kingdom",
                   "England",
                   "Cheltenham",
                   "51.902706",
                   "-2.073361",
                   "1"
                     ],
                   [
                     "United Kingdom",
                   "England",
                   "Halesowen",
                   "52.449848",
                   "-2.050526",
                   "1"
                     ],
                   [
                     "United Kingdom",
                   "England",
                   "zz",
                   "0.000000",
                   "0.000000",
                   "1"
                     ],
                   [
                     "United States",
                   "California",
                   "Cypress",
                   "33.816959",
                   "-118.037285",
                   "1"
                     ],
                   [
                     "United States",
                   "California",
                   "Downey",
                   "33.940014",
                   "-118.132568",
                   "1"
                     ],
                   [
                     "United States",
                   "California",
                   "El Cajon",
                   "32.794773",
                   "-116.962524",
                   "1"
                     ],
                   [
                     "United States",
                   "California",
                   "Fremont",
                   "37.548267",
                   "-121.988571",
                   "1"
                     ],
                   [
                     "United States",
                   "California",
                   "Pine Grove",
                   "38.413349",
                   "-120.659134",
                   "1"
                     ],
                   [
                     "United States",
                   "California",
                   "Rancho Santa Margarita",
                   "33.640854",
                   "-117.603096",
                   "1"
                     ],
                   [
                     "United States",
                   "California",
                   "San Diego",
                   "32.715328",
                   "-117.157257",
                   "1"
                     ],
                   [
                     "United States",
                   "California",
                   "Visalia",
                   "36.330227",
                   "-119.292061",
                   "1"
                     ],
                   [
                     "United States",
                   "California",
                   "West Covina",
                   "34.068623",
                   "-117.938957",
                   "1"
                     ],
                   [
                     "United States",
                   "Colorado",
                   "Denver",
                   "39.737568",
                   "-104.984718",
                   "1"
                     ],
                   [
                     "United States",
                   "Florida",
                   "Miami Beach",
                   "25.790655",
                   "-80.130051",
                   "1"
                     ],
                   [
                     "United States",
                   "Florida",
                   "St. Petersburg",
                   "27.773056",
                   "-82.639999",
                   "1"
                     ],
                   [
                     "United States",
                   "Illinois",
                   "Champaign",
                   "40.116421",
                   "-88.243385",
                   "1"
                     ],
                   [
                     "United States",
                   "Iowa",
                   "Iowa City",
                   "41.661125",
                   "-91.530167",
                   "1"
                     ],
                   [
                     "United States",
                   "Kansas",
                   "Wichita",
                   "37.688889",
                   "-97.336105",
                   "1"
                     ],
                   [
                     "United States",
                   "Maryland",
                   "Silver Spring",
                   "38.990665",
                   "-77.026085",
                   "1"
                     ],
                   [
                     "United States",
                   "Massachusetts",
                   "Boston",
                   "42.358433",
                   "-71.059776",
                   "1"
                     ],
                   [
                     "United States",
                   "Michigan",
                   "Taylor",
                   "42.240871",
                   "-83.269653",
                   "1"
                     ],
                   [
                     "United States",
                   "Nevada",
                   "Paradise",
                   "36.097195",
                   "-115.146660",
                   "1"
                     ],
                   [
                     "United States",
                   "New Hampshire",
                   "Goffstown",
                   "43.020405",
                   "-71.600227",
                   "1"
                     ],
                   [
                     "United States",
                   "New Jersey",
                   "Maplewood",
                   "40.729980",
                   "-74.271996",
                   "1"
                     ],
                   [
                     "United States",
                   "New York",
                   "Plattsburgh",
                   "44.699490",
                   "-73.452919",
                   "1"
                     ],
                   [
                     "United States",
                   "North Carolina",
                   "Cary",
                   "35.791538",
                   "-78.781120",
                   "1"
                     ],
                   [
                     "United States",
                   "North Carolina",
                   "Charlotte",
                   "35.227089",
                   "-80.843132",
                   "1"
                     ],
                   [
                     "United States",
                   "Ohio",
                   "Columbus",
                   "39.961174",
                   "-82.998795",
                   "1"
                     ],
                   [
                     "United States",
                   "Ohio",
                   "Medina",
                   "41.136192",
                   "-81.867371",
                   "1"
                     ],
                   [
                     "United States",
                   "Ohio",
                   "Miamisburg",
                   "39.642834",
                   "-84.286613",
                   "1"
                     ],
                   [
                     "United States",
                   "Ohio",
                   "Wooster",
                   "40.805058",
                   "-81.935143",
                   "1"
                     ],
                   [
                     "United States",
                   "Oklahoma",
                   "Broken Arrow",
                   "36.056561",
                   "-95.783524",
                   "1"
                     ],
                   [
                     "United States",
                   "Rhode Island",
                   "Cranston",
                   "41.779823",
                   "-71.437279",
                   "1"
                     ],
                   [
                     "United States",
                   "Rhode Island",
                   "Westerly",
                   "41.377602",
                   "-71.827293",
                   "1"
                     ],
                   [
                     "United States",
                   "Virginia",
                   "Chantilly",
                   "38.894279",
                   "-77.431099",
                   "1"
                     ],
                   [
                     "United States",
                   "Virginia",
                   "Williamsburg",
                   "37.270702",
                   "-76.707458",
                   "1"
                     ],
                   [
                     "United States",
                   "Washington",
                   "Bellingham",
                   "48.759552",
                   "-122.488228",
                   "1"
                     ],
                   [
                     "United States",
                   "Washington",
                   "Camas",
                   "45.587063",
                   "-122.399536",
                   "1"
                     ],
                   [
                     "United States",
                   "Washington",
                   "Seattle",
                   "47.606209",
                   "-122.332069",
                   "1"
                     ],
                   [
                     "United States",
                   "Washington",
                   "Spokane",
                   "47.658779",
                   "-117.426048",
                   "1"
                     ]
                     ],
                   cached: false,
                   real_time_render_time: "0.15873098373413s",
                   updated_at: "2014-04-10 02:10:14"
                 },
      geo_ip: {
                country_code: "CN",
                region_code: "23",
                city_name: "Shanghai",
                latitude: "31.045601",
                longitude: "121.399696",
                error: "",
                cached: true,
                "geo-ip_render_time": "0.00082206726074219s"
              },
      nearest_data: {
                      city: "Shanghai",
                      state: "Shanghai",
                      state_abbr: "Shanghai",
                      country: "China",
                      visit_count: 41638,
                      placement: 12,
                      latitude: "31.2304",
                      longitude: "121.4737",
                      distance_away: 23.873796569666,
                      top_record_state: 0,
                      top_record_city: 0,
                      nearest_data_render_time: "0.015353918075562s"
                    },
      total_render_time: "0.020803928375244s"
  };
  res.end(JSON.stringify(ret));
};

