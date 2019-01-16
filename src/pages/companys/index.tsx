import Taro ,{Component} from '@tarojs/taro' 
import { AtList, AtListItem } from "taro-ui"
import './index.less'

const companys = [
    '成都奥菱电梯工程有限公司',
'沈阳三洋电梯有限公司',
'四川景泰祥楼宇设备有限公司',
'上海三菱电梯有限公司四川分公司',
'四川朋达机电设备工程有限公司',
'成都兴亚电梯安装维修工程有限公司',
'四川西泽机电工程有限公司',
'成都慕尼黑电梯工程有限公司',
'上海台菱电梯有限公司',
'中国华西企业股份有限公司',
'四川安达电梯设备有限公司',
'四川西尼电梯有限公司',
'四川众雁电梯有限公司',
'四川西物工程电梯有限公司',
'重庆伊士顿电梯有限公司',
'四川升瑞建设工程有限公司',
'成都吉高电梯工程有限公司',
'成都苏迅电梯有限公司',
'四川省宏鑫电梯有限公司',
'成都奥力电梯有限公司',
'重庆艾派卡机电工程有限公司',
'成都比尔特电梯有限公司',
'成都市华西机电安装有限责任公司',
'四川中安工程有限责任公公司',
'四川通讯奥电梯工程有限公司',
'四川焱森电梯有限公司',
'四川奇道机电设备有限公司',
'四川宜达电梯工程有限公司',
'绵阳华兴电梯有限公司',
'成都市江南电梯安装维修有限责任公司',
'四川筝伟机电设备有限公司',
'四川省第六建筑有限公司',
'沈阳远大智能工业集团股份有限公司',
'四川快畅通电梯工程有限公司',
'四川风行电梯有限公司',
'四川国力电梯有限公司',
'重庆新城电梯安装工程有限公司',
'四川晶奥有限公司',
'四川昌达物业管理有限公司',
'四川永晟达电梯有限公司',
'四川西子孚朗电梯有限公司',
'申龙电梯股份有限公司',
'溧阳双菱电梯工程有限公司',
'四川凯宏电梯有限责任公司',
'四川佳齐科技有限公司',
'四川博奥电梯有限公司',
'成都高邦电梯有限公司',
'广元八二一物业服务有限公司',
'四川佰银安电梯服务有限公司',
'四川省巴中市工业设备安装有限责任公司',
'成都城邦电梯有限公司',
'东莞市凯铭电梯工程有限公司',
'四川奥瑞通电梯工程有限公司',
'上海三荣电梯工程有限公司',
'重庆迅策电梯有限公司',
'汕头市宏达电梯有限公司',
'四川联合电梯工程有限公司',
'四川上棱机电工程有限公司',
'四川优思奥机电设备有限公司',
'四川西士达电梯有限公司',
'成都久森电梯设备工程有限公司',
'成都升云电梯有限公司',
'四川柯菱机电设备有限公司',
'四川锐奥机电设备有限公司',
'森赫电梯股份有限公司四川分公司',
'四川佳冠电梯有限公司',
'四川中联行电梯有限公司',
'康力电梯股份有限公司四川分公司',
'四川荣杰电梯工程有限公司',
'东南电梯股份有限公司',
'上海瑞生电梯有限公司',
'西继迅达（许昌)电梯有限公司',
'四川安驰电梯有限公司',
'沃克斯电梯(中国）有限公司',
'四川华鑫宏达电梯工程有限公司',
'快意电梯股份有限公司',
'成都曼隆电梯有限公司',
'四川富士达电梯有限公司',
'四川昱升工程管理有限公司',
'成都万华机电设备有限公司',
'成都九信电梯有限公司',
'日立电梯（中国）有限公司四川分公司',
'深圳市牛田机电设备工程有限公司',
'深圳市长城电梯工程有限公司成都分公司',
'联恒汇晟（成都）机电设备有限公司',
'深圳市中航南光电梯工程有限公司成都分公司',
'永大电梯设备（中国）有限公司四川分公司',
'成都耀众机电设备有限公司',
'奥的斯机电电梯有限公司成都分公司',
'四川省嘉捷电梯工程有限公司',
'四川昌鑫远中电梯工程有限公司',
'成都双迪机电设备有限公司',
'成都市日星电梯有限公司',
'四川菱鑫电梯有限公司',
'潥阳市飞达电梯安装工程有限公司',
'四川新华物业有限公司',
'四川嘉信电梯有限公司',
'深圳市港日电梯有限公司',
'四川持泰电梯有限公司',
'成都鸣佳机电工程有限公司',
'成都瑞昶机电设备安装有限公司',
'四川华创联合机电设备有限公司',
'四川技高电梯有限公司',
'四川申菱电梯工程有限公司',
'四川瑞申电梯有限公司',
'成都中创技术设备有限公司',
'四川中意环泰电梯有限公司',
'绵阳祥和电梯有限公司',
'成都鸿友电梯有限公司',
'成都升达电梯有限公司',
'成都环通机电设备有限公司',
'上海现代电梯制造有限公司',
'四川芝浦电梯工程有限公司',
'巨人通力电梯有限公司四川分公司',
'四川津瑞机电有限责任公司',
'迅达（中国）电梯有限公司成都分公司',
'四川元鸿电梯工程有限公司',
'成都多快成套设备工程有限公司',
'四川鑫达电梯有限公司',
'四川诚岱电梯工程有限公司',
'成都兴科电梯有限公司',
'四川省通力实业有限公司',
'四川三众电梯有限公司',
'奥的斯电梯（中国）有限公司成都分公司',
'四川京迅电梯有限责任公司',
'成都世博电梯有限公司',
'四川永立电梯工程有限公司',
'广州广日电梯工业有限公司四川分公司',
'四川智德盛电梯工程有限公司',
'通力电梯有限公司成都分公司',
'四川特安电梯有限公司',
'中国水利水电第五工程局有限公司电梯安装维修公司',
'四川西子怡达电梯有限公司',
'四川广晟电梯有限公司',
'四川众拾柴机械设备有限公司',
'四川众安电梯工程有限公司',
'速捷电梯有限公司',
'美奥电梯（苏州）有限公司',
'多普勒电梯股份有限公司',
'四川快速电梯工程有限公司',
'四川奥坤机电设备安装有限责任公司',
'苏州华创电梯有限公司',
'成都多弗机电有限公司',
'成都广博电梯有限公司',
'四川华仁电梯安装工程有限责任公司',
'四川塞维斯电梯有限公司',
'四川省南星电梯有限公司',
'成都市金源电梯有限公司',
'成都平博电梯有限公司',
'四川威斯特电梯安装维修有限公司',
'四川江海源机电设备有限公司',
'四川中安电梯有限责任公司',
'成都安讯达机电设备有限公司',
'成都市永盛行机电工程有限公司',
'成都稳上机电工程有限公司',
'成都欧亚达智能科技有限公司',
'四川众意机电工程有限公司',
'四川省工业设备安装公司',
'四川科莱电梯股份有限公司',
'上海恒翔电梯工程有限公司',
'四川帝奥机电设备有限公司',
'四川天奥电梯工程有限公司',
'成都市立方安电梯有限责任公司',
'成都英迈机电设备有限公司',
'四川鸿森实业有限公司',
'四川益新电梯有限公司',
'四川华升富士达电梯设备有限公司',
'四川华升富士达电梯技术服务有限公司',
'四川广奥电梯工程有限公司',
'四川华鑫机电工程有限公司',
'四川康仕坦电梯安装工程有限公司',
'成都华明机电工程有限公司',
'四川国奥电梯有限公司',
'成都天投物业管理有限公司',
'四川盛捷电梯工程有限公司',
'四川至上三鑫电梯有限公司',
'资阳市三木电梯安装工程有限公司',
'华升富士达电梯有限公司成都分公司',
'重庆竟峰电梯有限公司',
'上海爱登堡电梯集团股份有限公司',
'四川新港电梯有限公司',
'东莞巨通电梯有限公司',
'苏州莱茵电梯股份有限公司',
'四川长河电梯有限公司',
'成都大工电梯有限公司',
'成都栗佳电梯有限公司',
'四川升讯电梯工程有限公司',
'成都富佳电梯安装有限公司',
'苏州富士精工电梯有限公司',
'四川奇钰电梯有限责任公司',
'四川上下行电梯工程有限公司',
'成都艾联达电梯设备有限公司',
'成都广昱电梯有限公司',
'四川圆通单元有限公司',
'四川力奥电梯工程有限公司',
'四川省菲鼎电梯工程有限公司',
'四川维基安电梯工程有限公司',
'成都沪菱电梯工程有限公司',
'四川安本机电设备有限责任公司',
'四川诚立捷电梯有限公司',
'四川莱茵森赫电梯有限公司',
'四川精诚房屋设备安装工程有限公司',
'潥阳江南电梯有限公司',
'四川铂莱电梯工程有限公司',
'四川通用电梯有限公司',
'深圳市日升电梯有限公司',
'成都世瑞机电设备工程有限公司',
'成都大东电梯有限责任公司',
'四川快捷电梯有限责任公司',
'四川安信捷实业有限公司',
'四川奥星电梯有限公司',
'四川省兴东阳机电设备工程有限公司',
'上海其士电梯工程有限公司',
'四川汇安电梯工程有限公司',
'四川亚太西奥电梯有限公司',
'四川阳升电梯工程有限公司',
'昌都市圣城物业管理有限公司',
'成都市亚欧达机电工程有限公司',
'四川博太电梯有限公司',
'四川省川穗电梯工程有限公司',
'江苏通用电梯有限公司',
'四川华森电梯工程有限责任公司',
'四川雷通电梯有限公司',
'四川福民方圆电梯工程有限公司',
'杭州西奥电梯有限公司四川分公司',
'成都鼎冠机电设备工程有限公司',
'四川镁程机电科技有限公司',
'四川蒂奥电梯工程有限公司',
'四川省聚耀机电设备工程有限公司',
'四川艾诗尼电梯有限责任公司',
'四川远鸿晟机电设备有限公司',
'四川省益友电梯工程有限公司',
'苏州江南嘉捷电梯有限公司四川分公司',
'绵阳帝奥电梯有限公司',
'四川泰成机电设备安装工程有限公司',
'四川省质安电梯工程有限公司',
'柳州富士电梯安装有限公司',
'四川瀛洲电梯有限公司',
'四川金成电梯工程有限公司',
'四川康旭达电梯有限公司',
'蒂森电梯有限公司成都分公司',
'四川至上电梯安装工程有限责任公司',
'富士电梯(四川)有限公司',
'东芝电梯（中国）有限公司四川分公司',
'四川威速电梯有限公司' ,
'四川省德恒电梯有限公司'
]

export default class Companys extends Component {
    render(){
        return <AtList>
            {
                companys.map((item,index)=><AtListItem title={item} key={index}/>)
            }
      </AtList>
    }
}