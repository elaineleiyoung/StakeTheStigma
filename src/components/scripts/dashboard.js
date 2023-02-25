import styles from "../styles/Login.module.css";
import { db } from "../../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { getNhsArticles } from "../../api";
import React, { useEffect, useState } from 'react';

function Dashboard() {

    const navigate = useNavigate() /*navigate allows us to navigate between components*/
    const [description,setDescription] = useState('')
    const [content, setContent] = useState([])
    function removeHtmlTags(text) {
        const regex = /(<([^>]+)>)/gi;
        return text.replace(regex, "");
      }
    const json = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Periods",
        "copyrightHolder": {
            "name": "Crown Copyright",
            "@type": "Organization"
        },
        "license": "https://developer.api.nhs.uk/terms",
        "author": {
            "url": "https://www.nhs.uk",
            "logo": "https://www.nhs.uk/nhscwebservices/documents/logo1.jpg",
            "email": "nhswebsite.servicedesk@nhs.net",
            "@type": "Organization",
            "name": "NHS website"
        },
        "about": {
            "@type": "WebPage",
            "name": "Periods",
            "alternateName": ""
        },
        "description": "Find out about periods, including when they usually start and finish, sanitary products, PMS, getting pregnant, and changes to your periods.",
        "url": "https://api.nhs.uk/conditions/periods/",
        "genre": [
            "Advice or information"
        ],
        "keywords": [],
        "lastReviewed": [
            "2023-01-05T01:00:00+00:00",
            "2026-01-05T01:00:00+00:00"
        ],
        "breadcrumb": {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 0,
                    "item": {
                        "@id": "https://api.nhs.uk/conditions/",
                        "name": "Health A to Z",
                        "genre": []
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@id": "https://api.nhs.uk/conditions/periods/",
                        "name": "Periods",
                        "genre": [
                            "Advice or information"
                        ]
                    }
                }
            ]
        },
        "dateModified": "2023-01-09T13:56:21+00:00",
        "hasPart": [],
        "relatedLink": [
            {
                "@type": "LinkRole",
                "url": "https://api.nhs.uk/conditions/periods/",
                "linkRelationship": "Navigation",
                "position": 0,
                "name": "Periods",
                "alternativeHeadline": "Overview"
            },
            {
                "@type": "LinkRole",
                "url": "https://api.nhs.uk/conditions/periods/starting-periods/",
                "linkRelationship": "Navigation",
                "position": 1,
                "name": "Starting your periods"
            },
            {
                "@type": "LinkRole",
                "url": "https://api.nhs.uk/conditions/periods/period-problems/",
                "linkRelationship": "Navigation",
                "position": 2,
                "name": "Period problems"
            }
        ],
        "contentSubTypes": [],
        "mainEntityOfPage": [
            {
                "identifier": "0",
                "name": "section heading",
                "position": 0,
                "@type": "WebPageElement",
                "mainEntityOfPage": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p><b>A period is the part of the menstrual cycle when a woman bleeds from her vagina for a few days.</b></p><p>For most women this happens every 28 days or so, but it's common for periods to be more or less frequent than this, ranging from every 23 days to every 35 days.</p><p>Your period can last between 2 and 7 days, but it will usually last for about 5 days. The bleeding tends to be heaviest in the first 2 days.</p><p>When your period is at its heaviest, the blood will be red. On lighter days, it may be pink or brown.</p><p>You'll lose about 20 to 90ml (about 1 to 5 tablespoons) of blood during your period, although some women bleed more heavily than this.</p><p>Read more about <a href=\"https://api.nhs.uk/conditions/heavy-periods/\">heavy periods</a>, <a href=\"https://api.nhs.uk/conditions/period-pain/\">period pain</a>, <a href=\"https://api.nhs.uk/conditions/irregular-periods/\">irregular periods</a> and <a href=\"https://api.nhs.uk/conditions/stopped-or-missed-periods/\">stopped or missed periods</a>.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "description": "",
                "hasPart": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p><b>A period is the part of the menstrual cycle when a woman bleeds from her vagina for a few days.</b></p><p>For most women this happens every 28 days or so, but it's common for periods to be more or less frequent than this, ranging from every 23 days to every 35 days.</p><p>Your period can last between 2 and 7 days, but it will usually last for about 5 days. The bleeding tends to be heaviest in the first 2 days.</p><p>When your period is at its heaviest, the blood will be red. On lighter days, it may be pink or brown.</p><p>You'll lose about 20 to 90ml (about 1 to 5 tablespoons) of blood during your period, although some women bleed more heavily than this.</p><p>Read more about <a href=\"https://api.nhs.uk/conditions/heavy-periods/\">heavy periods</a>, <a href=\"https://api.nhs.uk/conditions/period-pain/\">period pain</a>, <a href=\"https://api.nhs.uk/conditions/irregular-periods/\">irregular periods</a> and <a href=\"https://api.nhs.uk/conditions/stopped-or-missed-periods/\">stopped or missed periods</a>.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ]
            },
            {
                "identifier": "0",
                "name": "section heading",
                "position": 1,
                "@type": "WebPageElement",
                "mainEntityOfPage": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Periods usually begin at around the age of 12, although some girls will start them earlier or later.</p><p>A delay in <a href=\"https://api.nhs.uk/conditions/periods/starting-periods/\">starting periods</a> isn't usually a cause for concern. Most girls will be having regular periods by age 16 to 18.</p><p>Read more about <a href=\"https://api.nhs.uk/conditions/early-or-delayed-puberty/\">early or delayed puberty</a>.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "description": "",
                "hasPart": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Periods usually begin at around the age of 12, although some girls will start them earlier or later.</p><p>A delay in <a href=\"https://api.nhs.uk/conditions/periods/starting-periods/\">starting periods</a> isn't usually a cause for concern. Most girls will be having regular periods by age 16 to 18.</p><p>Read more about <a href=\"https://api.nhs.uk/conditions/early-or-delayed-puberty/\">early or delayed puberty</a>.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "headline": "When do periods start?"
            },
            {
                "identifier": "0",
                "name": "section heading",
                "position": 2,
                "@type": "WebPageElement",
                "mainEntityOfPage": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Sanitary products soak up or collect the blood released during your period. The main types of sanitary products are:</p><ul><li>sanitary pads</li><li>tampons</li><li>menstrual cups</li></ul><p>Sanitary pads are strips of padding that have a sticky side you attach to your underwear to hold them in place. One side of the pad is made of an absorbent material that soaks up the blood.</p><p>Pads come in many sizes, so you can choose one to suit how heavy or light your period is.</p><p>You can also get reusable washable pads.</p><p>Pantyliners are a smaller and thinner type of sanitary pad that can be used on days when your period is very light.</p><h3>Tampons</h3><p>Tampons are small tubes of cotton wool that you insert into your vagina to soak up the blood before it comes out of your body.</p><p>There are 2 types of tampon – ones that come with an applicator and others without an applicator that you insert with your fingers. In both cases, there's a string at one end of the tampon, which you pull to remove it.</p><p>Tampons come with instructions that explain how to use them. If the tampon is inserted correctly, you should not be able to feel it inside you. If you can feel it or it hurts, it might not be in properly.</p><p>It is not possible for a tampon to get lost inside you. Your vagina holds it firmly in place and it expands inside you as it soaks up the blood.</p><p>For more information, read:</p><ul><li><a href=\"/common-health-questions/womens-health/can-a-tampon-get-lost-inside-me/\">Can a tampon get lost inside me?</a></li><li><a href=\"/common-health-questions/womens-health/what-if-i-forget-to-remove-my-tampon/\">What if I forget to remove my tampon?</a></li></ul><h3>Menstrual cups</h3><p>Menstrual cups are an alternative to sanitary pads and tampons. The cup is made from silicone and you put it inside your vagina.</p><p>Menstrual cups collect the blood rather than absorb it. Unlike tampons and most sanitary pads, which are thrown away after they've been used, you can wash menstrual cups and use them again.</p><h3>Period underwear</h3><p>Period underwear are pants made from absorbent fabric. They soak up blood in the same way as sanitary pads, and have a layer to prevent leaks. They're designed to be washed and reused.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": "Sanitary pads"
                    }
                ],
                "description": "",
                "hasPart": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Sanitary products soak up or collect the blood released during your period. The main types of sanitary products are:</p><ul><li>sanitary pads</li><li>tampons</li><li>menstrual cups</li></ul><p>Sanitary pads are strips of padding that have a sticky side you attach to your underwear to hold them in place. One side of the pad is made of an absorbent material that soaks up the blood.</p><p>Pads come in many sizes, so you can choose one to suit how heavy or light your period is.</p><p>You can also get reusable washable pads.</p><p>Pantyliners are a smaller and thinner type of sanitary pad that can be used on days when your period is very light.</p><h3>Tampons</h3><p>Tampons are small tubes of cotton wool that you insert into your vagina to soak up the blood before it comes out of your body.</p><p>There are 2 types of tampon – ones that come with an applicator and others without an applicator that you insert with your fingers. In both cases, there's a string at one end of the tampon, which you pull to remove it.</p><p>Tampons come with instructions that explain how to use them. If the tampon is inserted correctly, you should not be able to feel it inside you. If you can feel it or it hurts, it might not be in properly.</p><p>It is not possible for a tampon to get lost inside you. Your vagina holds it firmly in place and it expands inside you as it soaks up the blood.</p><p>For more information, read:</p><ul><li><a href=\"/common-health-questions/womens-health/can-a-tampon-get-lost-inside-me/\">Can a tampon get lost inside me?</a></li><li><a href=\"/common-health-questions/womens-health/what-if-i-forget-to-remove-my-tampon/\">What if I forget to remove my tampon?</a></li></ul><h3>Menstrual cups</h3><p>Menstrual cups are an alternative to sanitary pads and tampons. The cup is made from silicone and you put it inside your vagina.</p><p>Menstrual cups collect the blood rather than absorb it. Unlike tampons and most sanitary pads, which are thrown away after they've been used, you can wash menstrual cups and use them again.</p><h3>Period underwear</h3><p>Period underwear are pants made from absorbent fabric. They soak up blood in the same way as sanitary pads, and have a layer to prevent leaks. They're designed to be washed and reused.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": "Sanitary pads"
                    }
                ],
                "headline": "Sanitary products"
            },
            {
                "identifier": "0",
                "name": "section heading",
                "position": 3,
                "@type": "WebPageElement",
                "mainEntityOfPage": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Changes in your body's hormone levels before your period can cause physical and emotional changes.</p><p>This is known as <a href=\"https://api.nhs.uk/conditions/pre-menstrual-syndrome/\">PMS (premenstrual syndrome)</a> or PMT (premenstrual tension).</p><p>There are many possible symptoms of PMS, but typical symptoms include:</p><ul><li>feeling bloated</li><li>breast tenderness</li><li>mood swings</li><li>feeling irritable</li><li>spotty skin</li><li><a href=\"https://api.nhs.uk/conditions/loss-of-libido/\">low sex drive (loss of libido)</a></li></ul><p>These symptoms usually improve when your period starts and disappear a few days afterwards. Not all women who have periods get PMS.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "description": "",
                "hasPart": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Changes in your body's hormone levels before your period can cause physical and emotional changes.</p><p>This is known as <a href=\"https://api.nhs.uk/conditions/pre-menstrual-syndrome/\">PMS (premenstrual syndrome)</a> or PMT (premenstrual tension).</p><p>There are many possible symptoms of PMS, but typical symptoms include:</p><ul><li>feeling bloated</li><li>breast tenderness</li><li>mood swings</li><li>feeling irritable</li><li>spotty skin</li><li><a href=\"https://api.nhs.uk/conditions/loss-of-libido/\">low sex drive (loss of libido)</a></li></ul><p>These symptoms usually improve when your period starts and disappear a few days afterwards. Not all women who have periods get PMS.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "headline": "PMS (premenstrual syndrome)"
            },
            {
                "identifier": "0",
                "name": "section heading",
                "position": 4,
                "@type": "WebPageElement",
                "mainEntityOfPage": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Working out when you can get pregnant – your fertile time – can be difficult. It's around the time you ovulate, which is about 12 to 16 days before the start of your next period.</p><p>But sperm can survive inside a woman's body for up to 7 days before ovulation occurs. This means your fertile time extends back earlier in your cycle.</p><p>You can calculate when your period will start and your peak ovulation times using an online period calendar.</p><p>You cannot get pregnant if you do not ovulate. Some hormonal methods of contraception, such as the <a href=\"https://api.nhs.uk/conditions/contraception/combined-contraceptive-pill/\">combined contraceptive pill</a>, <a href=\"https://api.nhs.uk/conditions/contraception/contraceptive-patch/\">contraceptive patch</a> and <a href=\"https://api.nhs.uk/conditions/contraception/contraceptive-injection/\">contraceptive injection</a>, work by preventing ovulation.</p><p>Read more about <a href=\"https://api.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/\">periods and fertility in the menstrual cycle</a>, <a href=\"https://api.nhs.uk/conditions/infertility/\">infertility</a>, <a href=\"https://api.nhs.uk/conditions/contraception/\">contraception</a> and <a href=\"/pregnancy/trying-for-a-baby/trying-to-get-pregnant/\">trying to get pregnant</a>.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "description": "",
                "hasPart": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Working out when you can get pregnant – your fertile time – can be difficult. It's around the time you ovulate, which is about 12 to 16 days before the start of your next period.</p><p>But sperm can survive inside a woman's body for up to 7 days before ovulation occurs. This means your fertile time extends back earlier in your cycle.</p><p>You can calculate when your period will start and your peak ovulation times using an online period calendar.</p><p>You cannot get pregnant if you do not ovulate. Some hormonal methods of contraception, such as the <a href=\"https://api.nhs.uk/conditions/contraception/combined-contraceptive-pill/\">combined contraceptive pill</a>, <a href=\"https://api.nhs.uk/conditions/contraception/contraceptive-patch/\">contraceptive patch</a> and <a href=\"https://api.nhs.uk/conditions/contraception/contraceptive-injection/\">contraceptive injection</a>, work by preventing ovulation.</p><p>Read more about <a href=\"https://api.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/\">periods and fertility in the menstrual cycle</a>, <a href=\"https://api.nhs.uk/conditions/infertility/\">infertility</a>, <a href=\"https://api.nhs.uk/conditions/contraception/\">contraception</a> and <a href=\"/pregnancy/trying-for-a-baby/trying-to-get-pregnant/\">trying to get pregnant</a>.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "headline": "Getting pregnant"
            },
            {
                "identifier": "0",
                "name": "section heading",
                "position": 5,
                "@type": "WebPageElement",
                "mainEntityOfPage": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Your periods can change – for example, they may last longer or get lighter. This does not necessarily mean there's a problem, but it does need to be investigated.</p><p>You can see your GP, or visit your nearest women's clinic or <a href=\"https://www.nhs.uk/service-search/other-services/Contraception-information-and-advice/LocationSearch/730\">contraceptive clinic</a>.</p><p><a href=\"/common-health-questions/womens-health/what-causes-bleeding-between-periods/\">Bleeding between periods</a>, bleeding after having sex, or <a href=\"https://api.nhs.uk/conditions/post-menopausal-bleeding/\">bleeding after the menopause</a> needs to be checked by a doctor.</p><p>It might be caused by an infection, abnormalities in the neck of the womb (the cervix) or, in rare cases, it could be <a href=\"https://api.nhs.uk/conditions/cancer/\">cancer</a>.</p><p>You could be pregnant if you miss a period and you've had sex. See your GP if you've taken a <a href=\"/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/\">pregnancy test</a> and the result is negative (you're not pregnant) and you've missed 3 consecutive periods.</p><p>They will investigate the cause and recommend any necessary treatment.</p><p>Read more about <a href=\"https://api.nhs.uk/conditions/stopped-or-missed-periods/\">stopped or missed periods</a>.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "description": "",
                "hasPart": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Your periods can change – for example, they may last longer or get lighter. This does not necessarily mean there's a problem, but it does need to be investigated.</p><p>You can see your GP, or visit your nearest women's clinic or <a href=\"https://www.nhs.uk/service-search/other-services/Contraception-information-and-advice/LocationSearch/730\">contraceptive clinic</a>.</p><p><a href=\"/common-health-questions/womens-health/what-causes-bleeding-between-periods/\">Bleeding between periods</a>, bleeding after having sex, or <a href=\"https://api.nhs.uk/conditions/post-menopausal-bleeding/\">bleeding after the menopause</a> needs to be checked by a doctor.</p><p>It might be caused by an infection, abnormalities in the neck of the womb (the cervix) or, in rare cases, it could be <a href=\"https://api.nhs.uk/conditions/cancer/\">cancer</a>.</p><p>You could be pregnant if you miss a period and you've had sex. See your GP if you've taken a <a href=\"/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/\">pregnancy test</a> and the result is negative (you're not pregnant) and you've missed 3 consecutive periods.</p><p>They will investigate the cause and recommend any necessary treatment.</p><p>Read more about <a href=\"https://api.nhs.uk/conditions/stopped-or-missed-periods/\">stopped or missed periods</a>.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "headline": "Changes in your periods"
            },
            {
                "identifier": "0",
                "name": "section heading",
                "position": 6,
                "@type": "WebPageElement",
                "mainEntityOfPage": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Your periods will continue until you reach the <a href=\"https://api.nhs.uk/conditions/menopause/\">menopause</a>, which usually happens when you are in your mid-40s to mid-50s. In the UK the average age of menopause is 51.</p><p>Your periods will not usually stop suddenly when you go through the menopause. They may start to become less frequent over a few months or years before stopping altogether.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "description": "",
                "hasPart": [
                    {
                        "position": 0,
                        "identifier": "1",
                        "text": "<p>Your periods will continue until you reach the <a href=\"https://api.nhs.uk/conditions/menopause/\">menopause</a>, which usually happens when you are in your mid-40s to mid-50s. In the UK the average age of menopause is 51.</p><p>Your periods will not usually stop suddenly when you go through the menopause. They may start to become less frequent over a few months or years before stopping altogether.</p>",
                        "@type": "WebPageElement",
                        "name": "markdown",
                        "headline": ""
                    }
                ],
                "headline": "When do periods stop?"
            },
            {
                "identifier": "0",
                "name": "section heading",
                "position": 7,
                "@type": "WebPageElement",
                "mainEntityOfPage": [],
                "description": "",
                "hasPart": []
            }
        ],
        "alternativeHeadline": "Overview"
    }
    /** {content.map((blob) => (
                    blob['mainEntintyofPage'][0]['text'] ? 
                    <p>{blob['mainEntintyofPage'][0]['text']}</p> : 
                    <p></p>
                    ))} */
    const fetchArticle = async() => {
        /*const responseJson = await pullArticles()
        console.log(responseJson)
        setDescription(responseJson[9])
        content = responseJson[15]
        setContent()*/
        setDescription(json['description'])
        /*for(let i=0; i<json['mainEntityOfPage'].length; i++){
            console.log(json['mainEntityOfPage'][i]['mainEntityOfPage'][0]['text'])
        }*/
        setContent(json['mainEntityOfPage'])
    }
    return (
        <main>
            <h1>Hi this is the dashboard</h1>
            <button onClick={fetchArticle}>Click me to view json for nhs period articles!</button>
            <h1>{description}</h1>
            <div>
            {content.map((blob) => (
                <div>
                {blob['headline']?<h1>{blob['headline']}</h1>:null}
               {blob['mainEntityOfPage'][0] && blob['mainEntityOfPage'][0]['text'] ? 
                <p>{removeHtmlTags(blob['mainEntityOfPage'][0]['text'])}</p> : 
                null}
                </div>
            ))}
            </div>
            {/* This is how I implemented dynamically created html elements in my previous project
             <div className="DisplayImageGrid">
        {imageList.map((image)=> <Zoom><div className="pic"><img class="DisplayImage"src={image.url.slice(0,47) + "q_auto/" + image.url.slice(47)} alt={image.public_id}></img></div></Zoom>)},
      </div>
            */}
        </main>
    );
}

export default Dashboard; 