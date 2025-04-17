import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';

const inspirations = [
    {
        "title": "Take the First Step",
        "prompt": "The journey to your goal begins with a single step. What small action can you take today to move forward?",
        "image": "https://s3-alpha-sig.figma.com/img/e42d/0d16/9f51253bd404d914dd92386d798a9e5a?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Un8nJGOBSBLUUiihaOcyA-gz8jzmzy4OTIrgUDR0Gk2A-WWEwjgyJOcpT5xzaQttmALZWI5Sn6vTA4g3ttuFDIJbytoYCtRi2rUAjkadVDw3Ll4RcYEEb2TYlaPu0mBAAPmbBysZK-tTQ8M20tyyrKYPKhBVDrtaFaF1Nyn8nTEw1c9sYVIzN7ykH6XB-ec1GQxuYyh9c1LnXcwpCP6mVfPQ-1bMryx0bZlo5k9lb6JIKfu-fzhoLJbxV~l1DefSOo1pk3z23KnVyJSma3OyBBUlcJZ5-x4F0CyolcX5EEhrO10LU-lj5DdeDLZAcC9RUxQNi1jC2j7n3o-4~uVNag__"
    },
    {
        "title": "Celebrate Small Wins",
        "prompt": "Success is built on small victories. What’s one thing you accomplished today, no matter how small?",
        "image": "https://s3-alpha-sig.figma.com/img/2859/673d/2008830554d080097553ad6e3a87235f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cOblGwU02iSofhR1mwUJwkRSQuX~AXAIMDYtLQI9eCEXtGrbpONUBbXS5IULqtqApunRfSUIKpydBEUEU~76fIbJyYExH2XdkE~V~xgqmorzVWOV2O8Rsbrs0Uh~p6ecsqKxr4ncQxNjBpcwAnZJ6QMzEk2ns0VIajuPy~7ClnrLhuIGjSiMt2pd8n43zvWUpFtM7l-ElDAv19ktbwSV6deo4tKmNhHPvCyPO2cTyFGAHKnjFuVKTbEVpjj8y0kZ2vLD5qYUXlbhykkVT0Ugg5jgTwQb5OEAjle~~BgrE6vEH6YQLE80Vlnmdccat1h~Fv93XWSxL0UeUYHV3h-8fg__"
    },
    {
        "title": "Focus on Today",
        "prompt": "Don’t stress about tomorrow; focus on what you can achieve today. What’s one thing you can do right now?",
        "image": "https://s3-alpha-sig.figma.com/img/90bc/7ed1/d499c63315aa922a877870e2f9c0b89e?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V9HC1JAPkoWOP2i1zGhUakaLyQXv5EJxYORRB6n7OYeYI0KwMOB9SHzSvba9fjoGZTmJ-j4aDgt4SxI~wEwoo0GQVPPp00WPR59ZaeP560oJogSTduvzPgpQwhMq7UDdT5KrEoPovj1kpoNl4kQabs5mOWcL9FmwFQKqtHCwJsHWGv07FgvQf1J15ZoLx2P9omb8VL99qqjlQM6bLTYuwCnM3Ga-v7cVvbvaPQ7T8laMui5wJrOR99ZKG5lPyjn6tly8n9a7iBLiuZDX~wtrbWrKJPgib11kduK05gnLV7FnH0o7ODAA~DbE3UGuYWUa8XNPMdu46RpNuXQMmPDo6A__"
    },
    {
        "title": "Embrace Change",
        "prompt": "Change is a chance for growth. How can you embrace a new experience or challenge today?",
        "image": "https://s3-alpha-sig.figma.com/img/211d/e98c/4a23f086d5ff4ac73e43b355f170237d?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kaVwBaUdfk~H11j~CCWfNonAMLfTpfLkxp8gSoPzXV-ZU71a3pLKLZikgBLcJL~BQHmaZ860T2-rcAYybShX0Dv8iPsnpI3JOmqrfi5Wx4KV30ZB16wM0KZLgLj6pI2PwognpCSpzLMj0ztPKpNa06kpN~~Y9bmXcFcgGdPyM6UEiSEo4CJay4lOhEvWc1IdJwpMqz4AUK89m6w6sl8RdpjCNecq9m7QNKRIkK7t-7dsGGcANLmawuk7RRZcwIAjHB4t3YCBUFOUI01knuXOr--vFVUB9RyA8~ItbJ9keUkENfMsiyleFIdcmeOf1WjKKZTvHABC5V9GKTsDF93GoQ__"
    },
    {
        "title": "Push Through Challenges",
        "prompt": "Obstacles are opportunities for growth. What challenge can you face today with courage?",
        "image": "https://s3-alpha-sig.figma.com/img/5d2b/651d/a8f4435f6cfbdbbd56339a589adc10ec?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cxhFVa51ftBr4usZiZAx6o2UxlJkARaYzKMjcDp0~lFM37m8dt4Apyi~ESWuIjnK3ReZxZlYQ6M48v0reaNisOZ-klJ6F~nciSZDJgVif-IHdXC3QVc~6maHQt9ALuF6KVznIRBc0a2YEBkIYpQCtTm2lvY3c7KcVwqgObZoiH-XpohNhk-M6o4O2E74kng2F1XAO-XCEyx-FVgBXGpUGBfOAEE8WXOPpjGSGAaH0ZwVKrvHvCYnnfCirmN7KMe0rEYx51OXYbfCRGuIpd1licmHZbZeaA9JkPiftNfTh-GIGwFKrzroYioSN0KSKEBNcbvBnmNobxp07DmQwClqIQ__"
    },
    {
        "title": "Stay Grateful",
        "prompt": "Gratitude can shift your perspective. What are three things you’re grateful for today?",
        "image": "https://s3-alpha-sig.figma.com/img/efa8/d9bd/dd6cde385597f2b6540b6eae0c4de2b1?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=By2RFOmPUfT0IivUm9gYNpssYTp4maMhFVGtmt5kV6mWeQU293Fj8hIktd-JBD~DTUFTBNaAEM3EplrHuEei~KCjZSREodGde5Dcq8FL8L8xcL3r1q-szr5n~YWUkVdjKhRkGJNvzX2o1ikFluVlXs41Yvi0W3skcUsfaSW6GhAM528osuJecf9qpOzuM0MVqpoA8cdPAkVDn-ztc~23y323f0BkJ7QE1wMlchY9Fn-OUmyocgFUiIWW6PbasrZ2~U1JLQ4E8GU-gD3IpbE7agiyegWVVCZUB93JnOtTPeGEMuchaD6fyDtCKqwLSJB2ZHbcHw4LEEb~pGrLAeKypw__"
    },
    {
        "title": "Trust Your Journey",
        "prompt": "Believe in your progress. Trust that the path you’re on is leading you toward something great.",
        "image": "https://s3-alpha-sig.figma.com/img/96be/82db/4b07bfaf7224eccce40ff4edae83787e?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=glUq9RzxRB30G0p2rEFcGQEGs746YgLDU4tfGPl7BswKNka55lNXHurvfU0xz~DBx-N~4dvE-cYmkM2ULshSXjytUBmwhdYgYAQq3nLxsRBZm8F~nXxSMx9joevQSIJurhp5aItNzGjYzsDu-uPGHAJ7f8WosNxDsyPkIyAOHlBmg9k5dPD9PkGbnV7tt17KDOApLT~uMZwdiv0I6Ni-yeuaa2yHcs6gdoqTA2qZ8LgljrwYRewSUXeEpeQscUpLJv62q2SNCnaUvKJA8cvZPodLE5S6JROTPJVeT1LH5H4HIkvhqTEgqRCMQ7~Dr-X6Krgvpue~ftk0e7nAqfc2Rw__"
    },
    {
        "title": "Learn from Failures",
        "prompt": "Failure is not the opposite of success, it’s part of the journey. What lesson can you learn from a past mistake?",
        "image": "https://s3-alpha-sig.figma.com/img/4692/18ec/049491dd2bc120740058d518f71f460f?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Mr-7O51L0vCXzXoxwapQ2Lm2Z1Zlw30bm1HYkJbJWGQ1yGLXVwIg7J-yLnnl2LAEvPIZjklqMrexj3~-lHLohzprgrQ5eLokjKmjYjnomh8a8Oaai8ix6~WJCCdrx1GPYBTlzwK1uqtYZT0AaU-c3ZHfmMaWhT9dcFQitLJUGAB9N1rTuo-Am6DokJxYFFP-JqKzOR9Dp~iAkRv55KPPOziMEyP4jEZoeNhsoF24hF5CU8ulO29l6Qldj4FMEjzDLeaGAvanCfmAcVi9WcnOkvH~A1J-cAdaf8gmfq5piOQ~ihgCHN491RexOjDwdL5CsMmyBJt6V1r6MX3As4XnaA__"
    },
    {
        "title": "Be Present",
        "prompt": "The present moment is the only one you truly control. How can you stay present in your day today?",
        "image": "https://s3-alpha-sig.figma.com/img/fe91/8303/59583291520eee1a0b1ae0084ce00f99?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hiiPiz6bA3lQIE~FNoh5eimkFnMN7sFos-B~z-03wYnxNUvd-0YJGPou-SyOuOJIxhYAVASbNTEM9Z3oQybdTLzZncDVdzKi1TNdSc7~q9pgNaIg457gguu3Ig53D4gUEqgLaEXMOXNKUKww4mOgoTgSX0DKD3VUKLqNU-l1OMQxbM-DpOWgCQlcfn3p8nA1x0fDd4NaiXgtescOuBbJqQ76FmhI7rOjT3MiOdCLhQJHlSo72RLWtuay2D4cJ8FcQROtE0o37GvAB7b7DHWM3bdGpmRRbQPOk9UbBcMRlmmYf19RHziwbQqHBGW9izIdnip5RfwMHNHeXaaDJGZ0IQ__"
    },
    {
        "title": "Believe in Yourself",
        "prompt": "Self-belief is the foundation of all achievement. What positive affirmation can you say to yourself today?",
        "image": "https://s3-alpha-sig.figma.com/img/0a9f/840a/45e415d8c03a36d11e4d85fe32269ed5?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Xhf6cUmch4CpBK3~Wy2qQYJd9859BMKIPzB0sHs85b5Ib4Bmgem-fz-6ffGqzo7umg354lly7D7LkgATxwkwLVdHZP8FejYpnDXAuwBejX9wIf8OSeh~pf3qsIMX6QmGh7FsAyq6gLJTT-8xcMi4e3HB26dsUxDcIxjA3yI~Q6d0aF94DnwmGesrkWGm9VEH-oyn23u46crtl2Uc2tsravOwX8mJSMOyXCNcncxOupInSbVgcs0yJahX4liGCiq5BmKdnu1URHIVgqayTIa-hQ8J9vYt0qyU5NXLNH2z534gvGVmX0zZAJ2J3oAXkj7YNrg7-ETZZPZnlFL32NPp2w__"
    }
]


const InspirationScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [inspirationVisible, setInspirationVisible] = useState(false);
    const [inspiration, setInspiration] = useState(null);

    const handleInspirePress = () => {
        setLoading(true);
        setTimeout(() => {
            const randomInspo = inspirations[Math.floor(Math.random() * inspirations.length)];
            setInspiration(randomInspo);
            setLoading(false);
            setInspirationVisible(true);
        }, 2000);
    };

    return (
        <View style={styles.container}>

            <View style={[styles.card, {marginBottom: 20}]}>
                <Text style={styles.title}>Inspiration generator</Text>
            </View>

            {!inspiration && !loading && (
                <>
                    <Image
                        source={require('../assets/img/Sparkle.png')}
                        // style={styles.icon}
                    />
                    <Text style={styles.subtitle}>Get your inspiration</Text>
                    <TouchableOpacity style={styles.button} onPress={handleInspirePress}>
                        <Text style={styles.buttonText}>Inspire me</Text>
                    </TouchableOpacity>
                </>
            )}

            {loading && <ActivityIndicator size="large" color="#fff" />}

            {inspiration && !loading && (
                <View style={styles.card}>
                    <Image source={{ uri: inspiration.image }} style={styles.image} />
                    <Text style={styles.cardTitle}>{inspiration.title}</Text>
                    <Text style={styles.cardText}>{inspiration.prompt}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                        <TouchableOpacity style={styles.shareButton}>
                            <Image source={require('../assets/img/ri_share-fill.png')} />
                            <Text style={styles.shareText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <View style={styles.floatingNav}>
                <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('InspirationScreen')}>
                    <Image source={require('../assets/img/mingcute_ai-line.png')} style={styles.fabImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('StatisticsScreen')}>
                    <Image source={require('../assets/img/hugeicons_profile.png')} style={styles.fabImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('SavedQuotesScreen')}>
                    <Image source={require('../assets/img/solar_bookmark-outline.png')} style={styles.fabImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('Home')}>
                    <Image source={require('../assets/img/hugeicons_task-01.png')} style={styles.fabImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InspirationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B46B2',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        // marginBottom: 10,
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
        marginTop: 8,
    },
    floatingNav: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        backgroundColor: '#6A78DD',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 6,
        gap: 10,
        alignItems: 'center',
    },
    fabIcon: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#3449e6',
        padding: 10,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 10,
    },
    buttonText: {
        color: '#2E43F0',
        fontWeight: '600',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 20,
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
        color: '#333',
    },
    cardText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: '#2E43F0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 12,
    },
    shareText: {
        color: '#fff',
        fontWeight: '600',
    },
});
