import { _, $, BaseObject } from '../common';

import distance from '../utils/math/distance';
import pointInsidePolygon from '../utils/math/point/point_inside_polygon';

import drawCircle from '../utils/canvas/draw_circle';

export default Object.assign( Object.create( BaseObject ), {


    DEBUG: false,

    ctx : null,

    width: 0,
    height: 0,


    setup: function (options) {

        this.ctx = options.config.canvas.getContext( '2d' );
    },

    draw: function () {

        this.ctx.save();

        const DROP = _.map(
            ["0.928522385771516,0.4528519375362052","0.9193525591380024,0.4413636669995862","0.9094706503946368,0.43018941921940884","0.8989952338574556,0.4193024516869114","0.8880258769601794,0.40867386059143845","0.8766445717348896,0.3982750879306377","0.8649228126887069,0.38807671118139936","0.8529157118276761,0.3780540626847793","0.840675041036264,0.36818088982711156","0.8282427108876099,0.35843425399096673","0.8156555422457817,0.348792484522693","0.8029455048458878,0.3392356974448705","0.79014258025543,0.32974429695366503","0.7772726941799941,0.3203004739214745","0.7643597841575591,0.3108876007323984","0.7514287420465552,0.3014878106241174","0.7385000857366787,0.29208632029168025","0.7255929811636539,0.2826692685856101","0.7127307296518259,0.2732200278900066","0.6999333719306657,0.2637246506033171","0.6872226187904334,0.2541683822379491","0.6746212148685445,0.24453635303687524","0.6621515071688931,0.23481474507665678","0.6498379501530361,0.22498925053875896","0.6377076624271226,0.21504466826653099","0.6257889554978654,0.20496677689351386","0.6141121688029358,0.1947412109664557","0.6027112204816965,0.18435356180606666","0.5916228121081584,0.17378973772400133","0.5808891723622783,0.16303530122361137","0.5705547169083798,0.15207747180636674","0.5606689908832102,0.1409043911292119","0.5512861122090116,0.12950605956871977","0.5424648113568724,0.1178746748250549","0.5342691868504178,0.1060054388080138","0.5267656434876964,0.09389843796967223","0.5200240454783915,0.08155838394815793","0.5141141377421302,0.06899658035237374","0.5091057447252436,0.05623086512728044","0.5050604598601732,0.043287191906448745","0.5020341904200066,0.030198327827668563","0.5000692048480525,0.01700361038648593","0.49924737588633594,0.0037470923187444723","0.4988984524714403,0.0038346655698404553","0.49804381874422077,0.017090885558029106","0.49606125777062743,0.030284172937792227","0.4930193613330758,0.043371158485010004","0.4889604774015787,0.05631261637140089","0.4839399963256462,0.06907577765809009","0.47802050562152276,0.08163516059575358","0.47127004038469406,0.09397267148537324","0.4637598565421678,0.10607753263484028","0.4555576710826126,0.11794436960677962","0.44673187697168326,0.12957398208289184","0.43734530030573704,0.14097077191469998","0.42745611486893265,0.15214213795901932","0.41711883621703316,0.16309855532569356","0.406382929960082,0.1738518823577782","0.39529332868598027,0.18441500041455833","0.38389047172383883,0.1948016121500385","0.37221137875448607,0.20502583806992272","0.3602906836576226,0.21510251911387948","0.3481590439777368,0.22504612159591575","0.3358447314581894,0.2348711838734349","0.3233735326328333,0.2445917400000652","0.3107701405433382,0.25422232833321","0.29805809509416187,0.26377770336046213","0.2852585503886348,0.2732715821445055","0.2723946288160176,0.28271961251104866","0.2594851980868935,0.29213502162767974","0.24655461325443898,0.3015351575442637","0.23362186131929363,0.3109336796887671","0.22070459720980093,0.3203433829683995","0.2078313710127865,0.3297849006119037","0.19502482795728546,0.33927376517555413","0.18231113232899596,0.34882801632582167","0.16971974877184254,0.3584666447020102","0.15728271660679977,0.3682101682634284","0.14503684675709727,0.3780801135769353","0.13302407961838872,0.38809918872109145","0.12129492458871073,0.3982930411450328","0.10990721746372889,0.4086880675492182","0.0989304148787673,0.41931262421449","0.08844682697272443,0.4301952979605591","0.07855591183010259,0.44136542485845953","0.0693688626946999,0.45284669277694367","0.06030483142993349,0.46437968785407824","0.05181359622294469,0.4761393890911583","0.04391059519519596,0.48811251168587877","0.03661085143816198,0.5002851944887629","0.029927777627556374,0.5126424236559907","0.023873911645346,0.5251688683527976","0.018460781135832813,0.5378481603195108","0.013698116936844614,0.550663988931174","0.009594297310934587,0.5635989485032051","0.006158257828888041,0.5766358062551737","0.0033923122207567408,0.5897560038081545","0.0012995747647051522,0.6029415591303937","-0.00011715455273434832,0.6161742596512692","-0.0008619347291139301,0.629435719896007","-0.0009368022868388921,0.6427081883717223","-0.00035129360580090355,0.6559739712202471","0.0008968125476604322,0.6692156051222822","0.0028089937859230984,0.6824156267585284","0.005386742554959328,0.6955559964625149","0.008627901848241944,0.7086189627413565","0.012530115687157546,0.7215867164674513","0.01709005886138469,0.7344412179743283","0.02230136053635013,0.7471650039426883","0.02815707330887479,0.7597406686879493","0.034649133916710616,0.7721513252379836","0.041768031463071224,0.7843800289859464","0.049503579074184144,0.7964105269415988","0.05784415093997186,0.8082266237494191","0.06677767391264547,0.8198129309399259","0.07629173188550398,0.8311539447742032","0.08637185596879295,0.84223508366881","0.09700389040915594,0.8530418813097389","0.10817293886080319,0.8635605629995894","0.11986330474048339,0.8737771811368086","0.13205960957176224,0.8836783644670156","0.14474522233261355,0.8932510875441327","0.15790318395335606,0.9024830741734048","0.17151591903235058,0.9113618752559255","0.185565563883655,0.91987561803996","0.2000342747030033,0.9280123145043393","0.21490314401646013,0.9357611293222374","0.2301524690830476,0.943111054262677","0.2457627260968724,0.9500518879807208","0.2617133176415339,0.9565733714967146","0.27798352701057494,0.9626662832559127","0.29455186211217216,0.9683215746077214","0.31139641333930473,0.973530715614001","0.328494396291205,0.9782862713962379","0.34582298680375345,0.9825813257883732","0.36335842627405546,0.9864100000492564","0.38107693621754024,0.9897667612460405","0.3989541019360032,0.9926479207568271","0.4169654292045355,0.9950502510374554","0.4350866226149887,0.9969715619686732","0.45329259149217216,0.9984107008561376","0.4715589609012333,0.9993685898553228","0.4898611570905589,0.9998456900439664","0.5081750834687613,0.9998455747745321","0.5264771206046784,0.9993676676998483","0.544743330960331,0.9984087412757542","0.5629493396008666,0.996968219155078","0.5810698172709816,0.9950452944517797","0.599080866196049,0.992641004590768","0.6169573559375259,0.989757885499598","0.6346751899040245,0.9863990494529962","0.652209516000467,0.9825681850728609","0.6695369931391559,0.9782710558309079","0.6866338030721686,0.9735133099294189","0.7034773204521458,0.9683022093427559","0.7200443234814469,0.9626450160452811","0.7363131808965157,0.9565503752445681","0.7522625795406134,0.9500272203217768","0.7678715243638181,0.9430850610052383","0.7831199746366588,0.9357337528315869","0.7979877305762562,0.9279840158582142","0.8124553876667732,0.9198463972383604","0.8265044161861197,0.9113319628377199","0.8401166045190225,0.9024525854080275","0.8532739001036168,0.893220425874604","0.8659593637518977,0.8836474146239012","0.87815549958893,0.8737461160242598","0.8898460046403427,0.8635294978870406","0.9010153711988069,0.8530109891013417","0.9116478529768813,0.8422044796339984","0.9217286580075754,0.8311235136435432","0.93124339195742,0.8197828456175688","0.9401777400196503,0.808196884235365","0.9485193755551073,0.7963809603316961","0.9562556538178155,0.7843509810884981","0.9633756001225884,0.7721223926099696","0.9698685578910565,0.759712312407107","0.9757252224988228,0.7471367052965632","0.9809372436419407,0.7344129769629203","0.985497782023845,0.7215587059949119","0.9894004755081955,0.7085907217299485","0.9926417453933013,0.6955277554511069","0.9952194444581474,0.6823876739207062","0.9971311869016063,0.6691875370150256","0.9983784837310589,0.6559457878435563","0.9989630845339985,0.6426799473603143","0.9988860231575806,0.6294075941540334","0.9981368816035482,0.6161461915440127","0.9967137512309995,0.6029138368314402","0.9946138486052858,0.5897289154910897","0.9918394800008301,0.5766096400935835","0.9883947808062536,0.5635739926706753","0.9842830116164305,0.5506403586971388","0.979511886521673,0.5378262014922731","0.9740902329861528,0.5251486385670748","0.9680277532677883,0.5126246721631056","0.9613352629983577,0.5002700941928672","0.9540250888170194,0.48810075420357835","0.9461101140498621,0.476131666039059","0.9376043353968336,0.4643774977348262"],
            function (coord) { return coord.split( ',' ); }
        );

        var ratio = 96 / 132;
        var w = this.width * 0.8;
        var h = w / ratio;

        var dropAdj = _.map( DROP, function (point) { point[0] *= w; point[1] *= h; return point; } );

        const colours = [
            'rgb( 140, 140, 140 )',
            'rgb( 70, 70, 70 )',
            'rgb( 0, 0, 0 )',
            'rgb(255, 51, 114)'
        ];

        const SEEDS = colours.length;
        var seed = 0;

        var halfWidth = parseInt( this.width * 0.5, 10 );
        var halfHeight = parseInt( this.height * 0.5, 10 );

        this.ctx.globalCompositeOperation = 'multiply';
        this.ctx.globalAlpha = 0.3;
        this.ctx.translate( ( this.width - w ) * 0.5, ( this.height - h ) * 0.5 * 0.8 );

        for ( seed; seed < SEEDS; seed++ ) {

            this.ctx.fillStyle = colours[ seed ];

            let pX = halfWidth;
            let pY = halfHeight;

            for ( let i = 0; i < 50000; i++ ) {

                let r = Math.random() * 0.1 + 0.25;

                let iteration = this.iterate( pX, pY );

                while ( iteration[ 0 ] === pX || iteration[ 1 ] === pY ) {

                    console.log('extra iteration');
                    iteration = this.iterate( pX, pY );
                }

                pX = iteration[ 0 ];
                pY = iteration[ 1 ];

                // constrain to polygon
                let inside = pointInsidePolygon( iteration, dropAdj );
                if ( !inside ) { continue; }

                drawCircle( this.ctx, iteration[ 0 ], iteration[ 1 ], r );
                this.ctx.fill();
            }

        }

        if ( this.DEBUG ) {

            this.ctx.save();

            this.ctx.globalAlpha = 0.3;
            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 3;

            this.ctx.beginPath();
            this.ctx.moveTo( dropAdj[ 0 ][ 0 ], dropAdj[ 0 ][ 1 ] );

            for ( var i = 1; i < dropAdj.length; i++ ) {

                this.ctx.lineTo( dropAdj[ i ][ 0 ], dropAdj[ i ][ 1 ] );
            }

            this.ctx.closePath();
            this.ctx.stroke();

            this.ctx.restore();
        }

        this.ctx.restore();
    },

    iterate: function (pX, pY) {

        let spread = 1;
        let boundingMarginX = 1;
        let boundingMarginY = 6;

        let dX = Math.random() > 0.5 ? 1 : -1;
        let dY = Math.random() > 0.5 ? 1 : -1;

        let x = parseInt( Math.min( Math.max( pX + dX * spread, boundingMarginX ), this.width - boundingMarginX ), 10 );
        let y = parseInt( Math.min( Math.max( pY + dY * spread, boundingMarginY ), this.height - boundingMarginY ), 10 );

        return [ x, y ];
    }

});