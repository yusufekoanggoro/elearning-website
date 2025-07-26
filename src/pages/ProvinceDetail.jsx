import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardMedia, CardContent, Grid, Button, Chip, Divider, Link, Tooltip
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicContext from '../MusicContext';
import Snackbar from '@mui/material/Snackbar';

const provincesData = {
  "31": {
    name: "DKI Jakarta",
    capital: "Jakarta",
    area: 661.5, // dalam km²
    population: 10640000 ,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Coat_of_arms_of_Jakarta.svg/800px-Coat_of_arms_of_Jakarta.svg.png",
    cultures: [
      {
        name: "Rumah Adat",
        data: [
          {
            name: "Rumah panggung Betawi",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Rumah_Panggung_Betawi_di_Kampung_Marunda_Pulo.jpg/500px-Rumah_Panggung_Betawi_di_Kampung_Marunda_Pulo.jpg"
          },
          {
            name: "Rumah Kebaya",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Rumah_Adat_Kebaya_dari_Jakarta.jpg/500px-Rumah_Adat_Kebaya_dari_Jakarta.jpg"
          },
          {
            name: "Rumah Gudang",
            image: "https://blog-static.mamikos.com/wp-content/uploads/2023/01/Keunikan-Bentuk-Rumah-Adat-Gudang-Betawi-beserta-Ciri-ciri-dan-Penjelasannya-1.jpg.webp"
          }
        ]
      },
      {
        name: "Baju Adat",
        data: [
          {
            name: "Kebaya Encim",
            image: "https://dynamic.zacdn.com/KN0vp4KmuM2dCYu5eKtV-IjOjVU=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/jamali-kebaya-7253-8128234-5.jpg"
          }
        ]
      },
      {
        name: "Tarian",
        data: [
          {
            name: "Tari Topeng Betawi",
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTERUSEhMWFRUXGBgZFxgYFhcbIRsaHh8aGCEXGxoaHyghHxolGxsdIjEhJSkrLi4uGyAzODMtNygtLisBCgoKDg0OGxAQGy8mICYtLS0wLzAtLS0tLS0wMi0tLS0tLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBEQACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGBwMCAf/EAD8QAAIBAgQEBAMGBAMIAwAAAAECEQADBBIhMQUTQVEGImFxMoGRBxQjQqHBYnKx0VKC8BUWM1OSk+HxQ7LS/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAUBBv/EADURAAIBAgUBBgUEAgIDAQAAAAABAgMRBBIhMUFRBRMiYXHwgZGhsdEUMsHhI/EVQjNSYiT/2gAMAwEAAhEDEQA/AOG0AoBQCgFAfQUwTGg3ND2x80PBQCgFAKAUAoBQCgFAKAUBO4rwt7HLzx+JbW4InQNOhkDzaV4pJl1ahKlbNyrkGvSkUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAbvwH+HC4hFOHvkFHIDKLqyAG7HU6HrFZ6zdrx3R2MDFwXjXhlqn5r3yZq/wK6MU2GIysC0FvKMols8/wCHKJq2M4uOYwPDTlWdNLXX/ZU1MzCgFAKAUAoBQCgFAKAkYDBPeuC3bUszbD9z2HrXjdiylSnVkowV2bXxfbtWFi6Fe7yEsWl3ygSWunsdYFZaEnLbrc7OOUKcbz1eVRS+7MFWs4QoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAn8L4xew5m05XuNwfdTpUJ04zWpfRxNSl+1/Dg2V3xRdvJbZrdpi6FOYEAZCCMyzroe3asvdZXZM7lKspqM0t9L9OpXcc8Mi4n3nBS668y2N0PXKOq1bTq62kYcXgl/5KW3K/Bj60HKFAKAUAoBQCgFAe+Cwj3XW3bEsxAA/10ryUkldk6dOVSSjHdm6v4AYe1ycM5zzlvuPidtPKD0QAnasl3N3fwPoIUVh45Yb8vlmQ8Q3Q2JuFTmUNAMkyBpMn1FaoKyscXGTz1pNO5W1IzCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQEzh3EXstKwQd1Ox/8APrUZRTL6GInRd4mv8OWr9y6MRh5tWyfMJkSNP1NZK8oxVmdmg5Taqx0T4M94xwXKxl1Y0JziOza6fOa0UJZoJnKx1PJWdudSlq0yCgFAKAUAoBQGs8IcxLF+5ZUcw5UDHcDUmP0rLiGsyTOz2cnGlOcVrsiNxLHXbNrkkQ9zzs86kGRA7bGrYJPUrxVedOOTl6t/gzlWnKFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKA659nLg4BVjZn/rNc3FLxnewb//ADx+P3M59p+Dh7V3uChPtqP0J+lXYR6NGbtKN8s/gYathyi/TwdizZF7ljKVzAZhmy7zl9ulSyu1zbHs+u4Z0tPqUFRMQoD1sYdnnKpaBJgbCQJPYSRqe9Abvgn2aY03lW6ES04XO0hvLIfKANZkAGCPeN1z1K7sTsV9juJKu9u7b0uBVUyPKROadY10A10Ek15c8s72Ljwd4MxOHS5bvW11ckNnBB0ABHWPcVmq0nOXwOrha8adHLze5kftUshb1rQAhXUxt5W/81LDppNMrx8lLJL1MPWg5woBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAXC+G75wpxeX8IRsZMSVLQNgCP1qOZXsaf0tTuu94KhhBg1IzPQ/KAUB1v7M8I33MNmXKzsdT8MHLl9TpPzrNXouTujrYSulSyvqaXi/hvD4hAt4lhMjLK+aI3n1pQpKEr3Pa8nVhlsUFzwFw4HUXx6Z/71tsjmuhPoyx4/xPD4a2l3zDKcpHxE6GARt0r3NY+goY+cabddaenJxHEXMzs0RmJMDpJmKqPnJyzSbJGC4Xeutkt23Y6TCsYkwCYGgrxuxDMju3hbwnZ4Yq3riF3Ia07GUBV2zLmBkaQAfQV4pJ7kqdGtWllpRu/W2hrzjxdtpky5FkeTVSfpIPtUVrqa3QdKdpKz89yjtLivvCzem1rMADQz5Y77a15d5t9Dqylg1h2ow8XvW5oUYEgaSdF13J6CpnGyy3S0OQfbH4fdFS8CWCMwcmNMxA39CI671GnG1zyrWzxSfByirCgUAoBQCgFAKA/QKHqTZ64PDNcdbaCWYhQPU6V43ZXPYxcpKKNrivA2bHmzalbCBDduNMA5QWCn1/Squ9SXmbp4VOraK8PvYreM+HGZsRfs2+XhkkoX8uYDSUB3nUj5VNTWx5WwznKc4K0V70MtUzAKAUAoBQCgFAKAUAoBQCgNZ4L4ljrLj7vauXbbEymRip7wYgHSqqkU92b8LVqxSWVuL96M3HFfBdjGuMQ+bC3WE3EBRi38RAJANVRqNGytg1UeezRUYn7Kln8PFEej2v3BqXfeRnfZ64ZlvEvgzE4MZmAuW/8AGkmP5hGn9KshUUjLWws6SvujW+F3dcDZRSB8bSN/MxP9hSUnJWR28Bg4qipvVstlLH4mY99TUIxXJ14U0lsft9ZG+vvvV7gtybSaPjG+GOfZYXTkRGt3HnNmZDIyrA313qUKak1GJ8721iFChZa68althvAWAtIbtrDm+ZBUMxOumg/81GXh0OVhcNGrJKpKyfXoXuFLW0Y3ALbOSY0JidBIA2+dQySa0N9XBQq1L0NUkk9LGZ41i7ly4VuXC4XbUkfT51CVRQT0PqcHRp0qacI2uVieOWwS8lVW7cZpRAYygxo59TrG+tQw+eS0Rw+15UFO8neXRdOL9CRwXx9dJZ8RyFBgLbDkMsb5gRvr3FaXCSezOPGpTlGzaXxd/wAH3xHja4y4WtPKposAgq3WZ6yNDWasm522PpuyY0nReV77lpgMKuKwmJt4h3uZVQJbUjMd5yk7bCvaTktDF23h4eBRile7vtscjseD8VdvrbXD3La3GOQ3NAq5o1YxJA7akCQK0Hz/AHU7XsSPE/gq7hb1nDrN+5dBZcg3GgjLuCIJJkiCNoNERcXexQcO4dcvXRZRWLEmQFkgDU6dwAdKHiVz4x1gJcKKwcDZh10B7mvZRcXZnl09iPXgFAavwd4Lu4xg7zbsdXjU/wAs7++1eXLqdCUtXsbYcTwvDW5C2YUGHdoknuZ3rG4zlJ3OvB0oQVtETX8b8PHnlZG0KCflGte91Ij3tL/2R54zx3bu4e42EdQ6iWFy2YI+XX1r1Um34j2M4zhKUHtqco4zx7EYkzeuEgbKNFHsorTGCjscmrXnU/cysqRSKAUAoBQCgFAKAUAoBQCgLHDccxFu3yrd64ia+VWIGup29TUXFPcvjiasY5Yy0PG3xK8pzC64J3OY0yx6HixFVO6k/mbXw/xXF/d+Y99vMYsqYMgGGdidlHwjuZ7VJUFuaqeMqW8WpsvB2Ge7ZdsX5zfzIAZjljQ6ep0+VVxhldzTOefw8FBZ4ecJzLUk20duW3dSfhPqD/Wh0qFKeHpa7br0fX0PbheNVpBOqkhp71BaGnD1k1ZlhgyjM2YjqAPbtVymr2uSlK70Lqz4sw+Gt3WusIXKkbk6SAB86N9Dk46naSbdkt/Uh4bxndLK11LVi0ZP4lxUcjocmv6xVGZ36+hmmqNtE0//AKaX0PLiHiW21y26ybalZfMrKdepUyPcwKsjVSi0b8FVpqlKm3q+eNfsfPj26vIe/abK0SHELOnbr/WoZYyZnVevQpuF7W+hhPAfAzimuXrl7IqsMxkBmY66Ofh7zWmMsi0MGHw8sRmnJ/2dGxXgnCX0zJ5DPma2UJYkd476+9eRqyRbLs+k3yZ3ingvlL5MS4UGWDtkYjQZUK6E7eUxpJG1eucZL/IeTo1KKSouTv0vsvQuvD33kottbDKFcHOAVzDaDPp/SvVTjEg8W6souotvsWWFtYlzckRAIUkx5tYI9iKslKOx3cVKg6OWO7XyLLhN3OqX7yAXwnLuMRroRMfwkgN03qqyWx8/SpN2XJT8N8PLaxmIxR1uX3hQFACroxjuSRqfT1orE1h1rJM5V4v4PkxpW7elrrZgEQtlVmIVYkGcoEAdIrx7mOcfFZmWArwrN34Y8GaC7iBPUW+383r6VDNc+hwPZSVp1/l+fwdD4RfENaJhRqv9IFRitbGrtKmrKcfQpvGWFS4RnAyYhOUWInl3V+B/Y6T6TWmFNbnztWWuVnHsVh2tu1txDKSpHqNKg1Z2MxL4HxNsPeFwAMNnQ7Mp0Kn3FQkrovoVnSlfjldUeXFBa5jGwTyzqobdZ1ynvG09a9RCqoKXgehEr0rFAKAUAoBQCgFAKAUAoBQCgFAdV8IYHLhjaxcEQAPKCbQY5ghO+Y6tl/L13irkmlZmmgryVzf2xbWymRgwtWwubQTG5jpNVyjodGjTlKpla3Znns8xTOpaSwPUHWRUFsfSSyrwvbYzPEuGPZuZlBIYAdNxtr7VU46nLr0nTeaOxPUOijyEM0xtrVkYdNyyOIUY3W5gcfiLr4kIBmYN5FMfG2us7wdda8VNRucSvWqVayitbbLzZsOE/Z3zxzcTfdnbfyN/9zv9BUlKysicuzpN3nLX31K7xH4NfCobuHulkA8ykNJE9REER0NeuWZWsV/8fUpxdSEr28iBw29fxtoYQElF1VtfJJnKdfMNP09KonLI0zRQc8XCVPjTxdPJ9eiN74IwVvDrcGUEsbYZY0lVymJ6FgW/zVbmUo3N9PBqEXl0vv6pW/sseK8QuW2hVt27c6BCJbT8wG0ftSKuyuVqaslf376kHw5wbnXgXuQRqq3CzAzuNWIkgzHfX0qyVROHdOK9bGL9DWoSWKc5bWyp/K/l5G+bjNm3Ns+XLoQelebHOjTlJ3KLEYy0L9tSDleTbygrEAwJmGGhEdJE6GrIQvFy4QxPaNRSjRjfNvda39/guXw6lfKDrHQaAnc9CNzuf70yV9iGarKWeT1/BWY3C4jn23tmEAOYDWZE6aGZ+UDWqcsoyui+m4xoTjJPM2reVuvvyMz4h8Mi3zcZYLLf8rFyouFQMiFLaEfEVBIO8gAEA6exqTWnJQpu7f1/BScI8H27cMFN42pbObZSJgjMp1kab7VW62VpT0k+L3PpMBhMOoQnNpvjz98F291oj4RVqTZ2XFcnnhz51IPWCffSrVG1mZcRBVKcoo1FnhVp0i6Ayk65tdfSrrnyWITTtI439qWA5WPMCA6IwMzm/LP6CoT3uZTIVACgFAKAUAoBQCgFAKAUAoBQCgFASeHYR7t1LVsS7sFX3J3r1A7fjcAqWghaXRRzHiBcuEDM2mzGBV1+To4KDc9Fcz7A9JBAj29KzSvfU79nHbdHvguKnruP9aVHOy2niVJWktSydS+RpEMZgkdOpHQTXrtN2TLp5JxcPfu57YnDfeAyMYJEaaEHbTsaijgSqZINHPeFcCNniJFy4Ga25MTmLCN2IOh1GhqU5NOxX2dh81VVHLVPb4G8xWI+7ADDqqZ/M4a4x19FJIE99KrlLKzsrD63S/g+8ewI5lzmh2WSnNLKPYbVZwTpUst5cGA4HhL2HeyyOFzXdZ1UsMwy/TSfWqWlUlZnKpQqYemrcvXozVfe7tm8RcKku3lNsbToFK7zXq/x+E6dCtvGotLl/d4XiLhEYchjoSpXzdQTrp84qcs8WtCVOrhaUnNyV/Na/wBljwfBG0TbxFoK484BylmXZisGCANTB00MGkLyeV6GTH4pTj3lBuS2068XuVWLxptpce75lBVbfMCllLiQGafMVMgzqY6VprqMYXT1OFhY1K+KyTdoeS4Vl8L9T94dxUXrhJIZ1RQO2hJzZSI3yzqBoNjWeDUmdfE0qOGp5ab0bb+nXc0uGxwym7cbKsAjc66qWDSQVIiBHSdZqbdjmwp95LJBX93/ANkfDccs3PJomhXzgBXWMoWdlMxupESIquNWL0OhPsyrSWbf03XPx52Z78QxAZbqgmddX0ClV0n+EkSY71fTlGMk5bHJq4WdSHhsnx5sznFr7W8McUcUqm6QhUKMrAjZiGAmF136adaordzN/wCNbaq/wN3Z9XEUlGhiYq8bu+vXS2nmZRuOWyYB5h/hBj9a8uzsSxcfUlJjCR8OUetWLPJHqxLfFixwPF7gJElgRpPQ+lXR3szn46kqkHKK1RiftG4jYvcnLcDXreZXCiRl3Hm2kHp6mvalj55mJqo8FAKAUAoBQCgFAKAUAoBQCgFAKA2f2V4e398N64yqLKFlBIBLHyiJ9J/SpRRKK1On8SxoNrIQPMwJP61KWljvdjU/HKT6FQ3A+aC1m5MGNcyGfTMAD9TWeVSN9dDfVyvqn8/fyPvhfh9UecSyM+byorSCAJLMP2rLUq8RM9NXd3uZmzx9WxlzyKLbEW8qnVcpIVk7E9us1OKaV2Sp4i07pnVsAMPcVJX8RQBm2OnVo0Jq5SW5z69OTk2ZrjngNmdr2HuIbhky8qST3IGteTjm1RdDEwjFJxs1yQuRiSuV8Izspgwyg+0g+ZdKjKOZXaOlDF3V1z52IWMS9cEStvSIgmPSNNa8cuDVKlUmt0r/ABJGHCooVlzKBEbdN/rrT9QoxytF/deBRXB8YMZbq3JmDPz1kz31qqnUSqJvqVzoZjUcC8Ui2zrdO8ZTB6Tp85roTqwbtc5faOB7xR7vdbokcR45auBLgIcoWCErEHQN+mlTpQjLx9CvBYOazLZO1/4M/wCJsU97ClrY/wDkCmVLRpmBgdiB6/0NOJkstlqaZYdRqpc2diN4c4VbzFfgYqCSC0kidBJAIzEDKSJkdtKqKSdintChkUXbTn1NfxrAJyeWWhVggqE8mwEqSDqCTE/lPXec4qSsczBV3Qq94lfi3XrZ6md/3fGaOaRuMxRwM+vlUEajLrPoxrP+nV9zrrtaDTaj9eD2x2GdrjKxRkuQVJWIWCAQzMQVyj4lM71oaOfRk8+qd176FJgsbcw0DMcp0JFYoTcXY71ajTlFRqK6+xTcTFi1PKuKhVoZXMnXWQx6Cesn1q+Enn0WjOZiVCm7J7FXe4/Zt/mN1v4dvqdP61p9DFLGUoc3fkU/EPFN24CqgIvYak9NSf7V403uZavaVSWkVZFDXpziw4Nwe7in5dlZO5JMBR3JP/uoyko6suo0J1pZYIv8T4Mc2sthTev22/FNt1KFWmMmYAkiBMT8VQVWN9TXV7PlCmmtZc2MticM9tilxGRhurKVI9wdasTT2OfKLi7NHjXp4KAUAoBQCgFAKAUAoBQCgFAWeC49iLQCpcOUGYMMP1oaaOMrUVaD0LNPF7n/AItm2/tKn96i433Ni7Vk/wB8U/oWvDfFWEQOwtPbuXFKMw1Crp8P8R7wNqrlTu1poaIdoYdu7TR4YbBC49t8MWNsuAcwjzLBJmBIAIPpXkoPbqSU4VHmpPRHYBhA9vOpZOWCxKwCy7kmdJ7fSrVTSikK6lGSe7Z6YDHqYy81uxyj9q8cTPKT5PfF41wABbeCdToPn02qmWdNKK518vM9o5b3bKrHYZcRLIVF9R51GzjUBh9Dr6GvZw1OthMV3ej/AG/Yz1xSpIIgjcGsrumdmLUldHjibIIm2SpqKRBxlbzPK0bkhSp2CyuuaQZOm3apxc4K6e/25KbSTefYjYPmDHiw7/hPbLHbyld2BOgmPnW3DS8LS2OfVr1aWJ8L8Ljf4o1fEOG/gKlkggEXM5ggnWDof9RUJwk3ZHMj2i1Vc6i129DAYPjT5rw5mRreZXuOZVZJUi2FgtmjrAABJpGhK+5bLtOMouy+MtUvRclvwzxzZw9pUuvev5CQPw0UMJDZcpYEAEwDEdO03qDjFHMqYmM5Sk3dvyS+3BMb7Q7fLH3dCM0gLcUKG11Mr5WcnMY0kncbV407WROnVg5ptv52+Tfltcsb3iH75ZzahSfhBYCZGYwdQQyxA0HzrPKTkmmd7AYWCaqRd16Wfo/Qr7mBXLIkDqCzRuDIH+ulRVK7VtuToygtV+TD+NPDjWh95F03kdsrErlKmNA0EjWCJ9K2OGVabHyPaOFq0p5pu9+TJV4c4UBbcB4FcxLHL5UX43Ow9B3b0obMHgp4mVo6LlnYMJwm0mBOHwwymC1tzEtdE6uf4vh9JAFGlNaGvu3hJaPXkwWIw9/DWxiGJRS4DqubMj7+cDadYPWqpUW1qiX6yEXuXnijiuBZ0t4uy7qyZ7d1DEToQDIkSCYOkms9KM0nb5E8Z3LlGM+l7md4g/CVtOLAc3MhCm4rt5oOsh1UGeuUx2NXR7y+pmmsJGDyu7+JjKvOYKAUAoBQCgFAKAUAoBQCgFAKAm8H4c+IvJZTdjqew3LH0A1r1K56lc7XgOEIltLIhLVseZiNhvBjdiRJ7mrXax3sLT7qndK7eyJmLx/MXl2iUQQRJglh1b37dKqbOrh8P3fjnq/svL8kTDWWZvjKzoYiAfUHofSitIox2FTWanv91+fuTMfw68ikwXI2M9favMhw41YsyuGDrdN3OwuKBGsER+Uz+Uk6+1QvFvK73OhS8avdehscQDctg4y0UaBF1FJA/mG4G29eTo3RbhsXGL/xS9U9vgyufgNyM1t0uqRIKnfbofcVklRlFnVjj6b0kmiM3CL4P/Cf6GoZJFqxVF/9kRhg79u6t50KlCcrR0IIg+nXWtNC6eplk6dWabtbX6knjHGyloE7jMWghQRB2B3PX3q6VRJ6nMxuAk5ua/bbl6nP/D3DXv23C/Eyu7OWCAEmNW94MRrl0HUdJZYUV1Z87h6cq1WSXC9/yWZ8D33UE3bBI0jM3wkiPKbffSaxzne1zbDATk7KS+pDv+F79uWJt3JiRaKs0EE6W8oPWYAkg9pryLR5PB1Ivh+m/wAiDheamIW0t65bVwTJBMQN8o3kKBp+0VKth4qSvyQw2OrQuqbfptr532Jl3xFy8S1u4+a2ui3F1Ow31/QbVl7pcM6n/JzhVy1NlytT78aeIF5TYVZLMUZyRoB8YAnXNJBOlaW7LKV9qY+NVd3HjcwtQOKWPAuFNiLoQaKNXbsP7noKGrB4WWIqKC25fkdWwmBW3aFq0sKBr2Hue5615KTy5UfZ06UKMFTgrL3qT8HeHK5Z3Uk+4MfvUqP7bHI7RouM1Pix7cQ4ajq1u7B5iZL3eDqr+rWzBnfU1fucCpCxyPjV57SNgcQma5Yc8t51VdJWOqMII7aVmcMsrknXzUlCS1Wz/gz9emYUAoBQCgFAKAUAoBQCgFAKAUAoDrn2b8AXD4c4y/Cs4BWdwu4A7ltGj+WrF4VqacPSc5JLctcbxPmwIy21mFnc9WY9WNTSPq8PQVNZnq/eiIK3Y1B0/p7/AN6pmrM0d4SbuM8ojfbf/UzUc9iaszpVlEa2jaTlAbr5uo+tWJnw9ZONSS8yh4pgbC3Vd11Gsbhuok+9e5b6nqqNKx9vxlyfKo1MN6prp7zXrjJWsItc/D1PXBY20YD2OWXeNNYG4JZdiY+sVB7LMi2M538Etl8z3xmPwyaG7l1iAxOny2qMnTj+400sPjKiuovbnT7kTG/d2RTm5iNcCsc+wMgSJBOpH+hS8HsTUcTBtSunbRW5OcYjHMbpw4BZCwXOp3BaFII1EkdKzOT2R1alecoZZLjUl+E8Jy7eJ8y2W5uUSgYDQtEHdQzwNvhroZ81OPkjk4PDyVSo1y/t/vyNHgs1oFsTcsloAVlXJoY/xE7ntVCRti3/AN2vVETFLdW4RkwwtSDm5j55kmcoUdz1j1ok0z2KnKdrK3x/Bi+N38l7E320y3XymJ1LsSmo0JlDPoelaMXWbyQhwjh4fDwpSqzqrm3qc/uXmZi5PmJmRprvOm2tZzKaTxDwDFMgxv3dxaZELMBoDlAPlnMF03IqTLq+ZzzPnXT7GewmDuXTltozGQNBO/ft86g2krsqjFydludS4DgkwttEKQzKpckaljv7wZFR7xaWPscFShQpKMd+X5/0X+JcRAOnTbbfp7VKxrgrEDUHMumWCPftVqjoK0FNWltYu8HfN4EgEuDJHY9R/KammfL4vD92rP4GK+13hlsJavTF2eXAHxJBIk911HqKjNaXOW0cwqo8FAKAUAoBQCgFAKAUAoBQCgFAar7O/D4xWJzOua1ZAdxE5j+VI9SPoCKlFXPUrnROPXHJAcFRrlUiIqx6ux3ezKayyn8CunoQa9Z2c2lmfpwpA0IPzA+UGq5rTzCg4rRn7auZHQuAesKytP8AhGh6tlHtNZIVFNXXp7uZ6mItF+h0PgnFBygIMkkmekmeu9Tc3wcGpBTlmZMuYxT8VtSP8teqpIr7mJDsXluXwtq2o00EfmEmZ7Rvp0r3vZ312JqnShG8kZrxLeufebiXCPKYAUACNxoPQ71mq1JX1Z9R2bTpRoRlTW/zuVMTVF825vD2TlEgwZyt6jQx6if19a8jOzcSDcZtx5X0Kb/ZjCUtsRp8QDEkiXmB2AmRVkZHPqUcqavbz6k7Cg2y1t2LSdcwjza+p/LH0rdSlvF8FNOKg7X39sj8RRCVjDqSPzEsSfmFMe1JN32ITis13G/z+57rh7agMFa2AJyZlMegAP0Gm+1WLTVntOEYRvZq3mXHBbAa+Fdo5jTGUMAfMYKxqpkg76Hp0y97mqFlbDRp0Jycbt9f48yRd8JcNt3DeSyhbU5ZaAQY0SYGo7aVapWWqOA6FNPY0WFx6EOtxfKQZVhuD0g7zVnmyurRdlY8MDhLCKwW1btq2pVVVQTsJA3MVRdvclGmou6KDxHbVyWtgEDQz0JgTmAkGBH0quUHK3kdLCvxWepU4fEknaAO+3ynpV8Ja6nZhVcteD3xWKHxNAHsNflVrns2eynGMddiPw/FXGuhkLLJAgHQrI3GxMfSopuUrnPquNSMm1okeX2m2J4crHdL417yG/8A1V0lofLzWpySqSAoBQCgFAKAUAoBQCgFAKAUAoDrX2T21t4K9dI/4l0LPooBH6sasitCUTUcTZDy/MRJYSSdJ1/bapPc+i7JlljJW6Mq8TbZhBZYHyrx35Ow4RtoVz2Qp+JfrNVXaejKnTjHlI+sLwm5fS5ysyqWAdgAZI8wGXqAdfmK9hHNqcjHVoQ8K59/A8HweMt7MLgHRWg/9Jj969dM5veok4LjV8NDKEjcsCP/AHVbgSUz14jxzN5l1RCpcggEgGSE6BiAYNMr3RONnoy74qUxWHt4uwVJyrzVVy5QQCA7f4xOs9/SstWF1dHU7JxLi3Qn8H+ClrOfQnu4Z7ZUsYQeQCB8R1gnbeev6V5GneTkkYaycKjlDla78enPQ+uHYq2iNzrZlgoiQQddR3Hl0kaiTvV0YKMrsrq06kkmnl9dfT68MoOPYpWBNtShDE7kgHMSACRMBTGszqauTWZtGCu5qCzO7T3tYz97j91DA1HtVkZMzPEyjtdknCY17120GbKpfWATsCdROvtXjk3ueurOTSWr6HQvDvEcOnMuNetlgrpbzhsrRIObSQDEdSNahBJSbbNeOnUr0YxpL11Wn+ncicNxf4jtbSAyyoHwqYO076xWiEfHe90Y6cHGcY1l4b78FjwjiTFmFyWQjzTrG8R6ztWhNyTTR0u0KNGNLNouhXYnGXLjZEn+JgNB6DufWq1SbPm++SKni/H7GHPKuvJIy8tSSVOh5lwjqDrAk1FxSL8Pi4wneWxS4jxTaVfIQYIEkydpnL2+e41qp3vY6Uu06UY6e/Mhf702pLNzHb0AAHtrUrcszS7Spt3ldnrY8dLbYG3aOkxmIqSbWxGp2nSlDJldvUo+M+LcViUNu64yFsxUKAJ7zv8ArUnNs4zbZRVE8FAKAUAoBQCgFAKAUAoBQCgFAXXBfFOKwq8u045eYtkZVYSYBOonoNjXqbR6nY2PCfGy4gLbvlbVwE5XUHKZ0g6kiozqTWqOz2fi6cFllv8AQ/cenEc2W3hgQTo4dWBHf0HXWqlWT5+horYzEN+GH1RdcF8HXW82OvEj/l2jlH+ZgAx9hFQnX6FC76f75fBaG1wa2rKcq2qompET8Ubn6RU6FaTlbghWw8ZeJ76FTe40DmRrQkEjQzsemlXOvrZo2rsOLSlGej8v7IN3iC7BD/1Cofqo3tYPsKXE/oWmA8PrdTmvbbK+wBiP4iI1npVylc51dvDy7p2bXJK4Rw42rvLt3H5OpdYtqpbLEvK5jsBAPTY615KGlyFTEZ2p2V0Z7iVgW7zpA0Yx18p1H6f0rE3GD0R9dhqne04y8vqRi9QlVb3LrEC5eUkmYKgyD9agjPOUW79CkwYzyx2YmQPqD71ZexzVFTTzbP2iPj8Mc3lUj2Gnv6VPMYJUJxdtywwGFBdYUhVgsTpmI1AHsdfkKjKWhqwNCTnmlsj6x2ADBsuXOXLBZ6H/ANZvmarzG6dDR2tdtu3r7v8AEs+DYdraBTOnX1/tRSad0aqFNxhlZYm5vOs+v9q1RxUluU1+z8PW/dH5ELivh7F4uy7YfECyiGOVlKAnTe4DuZO4jStCruptofN4/s7uKijB3uvicm4hgbtlzbvI1txuGBB9/UetROY1YjUPBQCgJvDuFXr7ZbVtm9Y0Hudq8uX0cNVrO0I3+xuvCf2f22uN97fNlWQlskTqBq0T12Ee9eo2VuzZUYpzereyLDi/2aWLhDYW5ye6tmdfkZzD9aqhWjJ2ehVVwUoq8dTnuL8OYq3eawbLm4vRVLAjowI3U96sk1HcyxpTk7JEjjXAVw1sC7eBxBIPKXUKp/xN0O361CE822xdWw6pQ8UvF08iiqwyigFAKAUAoBQCgFAKAUBpvCN7EkOllbLWwQzi7kiT6trstVVbW1OhgnValGCTXNzo2D4wtu3ywbb3MpIt4fzBR3JiYE+2vtWTJOT0Og5xjZaX6HgniTEskJZDMqhiA0R6a/m309KlCk53twRi51L5VsfPH+I3kw1rzReugMQN1EZoHrOk+tTpaN2PdWlcg8Ix/MTL8DjSP3161fJZo25Otg6+ZZOS18O4V7+IW3ynCA5rjMVPlB9Cd9h71np01nGKxc6NNyy26Xa3Or2iLaBdAAIAHQdB9K1s+Seac7lTxHGraTMGKbSVEkCdY0OpFQ7zKtrovjC97/0Y7jt5XRMTbVwjBYzjzFSAZOw0J6TO81XiKbTOv2Xi8t6bdypw+JVxKnSYrI9DuwqRmroh8R4Yt0mdDAiI1PbX0BHeYpny2OdjnGM1fnd9Cntnlxl+H/WtWFa8OxaWbLXLeZSgk5QCwB1nUjouhE96JXdj2VeK05IHC0ucwjlN1VoUmD2JHtUZtW3PaM8s9S9w+BUQ5GusE+m8e0j6ioKWtjdFQU1Hm1z9xt+IUbmvb3J1JW05PxdE9Bv7d68JbRNVhcSMPhAWDEnRmVlAkmcjDNmEiNhPyrfStGJ8xjKufE62093PS7wjC4u0Ld1VvKPMmYmQD0DAySB61XSrd43Kz+Kt8jLWpp6ce9TNY37KsExLI163P5VdSF6aZlLHvBPzrRmRleHfBnU+yi4MRke8ORlLcwKJ9Fyk79eogVPwWvcrVKd7WPbC+HcLg7pkm64UKS8ZSSPMyiNFIMayR3qmq09DvYLB0KcVOprLpwidi+MR5VSB6RXikzdPFZdEj94DxAjFW2aQryjT0DD4vkYNWxTWrMGJcqqZaLxUW8TcsuQpDbH1109JMfKsNanlloVUKt1qWOMxqMCAS5ifw2BYQdYHWN4/fem/U1NK3hOb47B8KVme7ibt1maYQAn/ADHUT9K6MaztpTX1OLUw1JNudV/QyfGmsc0/ds3LgQXABmBMx6zVrlmS0sZZxhGTyNteZAqJEUAoBQCgFAKAUAoBQH7QG0+z3EhUxIGh/DJjcr5hp6gke8jtU86jB9TXgtJt+RvfDXCuSgW5ImWYt+URoCT2/c15Tp5Y+Z2MO8tJvrwZfjjM94vlIBiBJIA20Pbt6VVGnlFRanlbvQRKNpsQDP1H9Ki9NyUJNbo3nhjjjLh2A1ysTtBiAdfWe/fpUlLwsjioQq1FKfQlN4lUsQD2/Xv86rhdpNnOm4p2RW8c4sWQjLrFW5boqctSB4ZxVs2jYv3BnYOU5l+AlteSnK8xAgiBEme25qtSbbptbLfqewbjJTRScZw5tkWiAFibeXWVHWffrtWZxsz6GNVVIK30JeDvB1TOSI+Igkae427z0iarki2tJyo5luvf2PdCr3mttayJBlgGfMC2jLoCxZREwRpIA2oqduTldy3HWT+draLS99LOz/2RkUZUyI3lUN580Bc2rZZ89uBv1PyrXCCa1IVcRKP7b/ztzo3pvZa7Gjw+CEMAFmAfMqxmLkhhmghTtJX8xBgGqHCMW3e/v8G+E1ZTmtdb2v019Wr/AMo8OJOAF8wLQM0HrrpECNh+0g1Q1HN4emvS5owrfeNx/br/ABbXX3uUqtLlj0qXBsTvK7JvCF5zghgEU+ckxG0Sex6+knpVlODcjNicWqdNzueHiniofECy1khrUBjm+KQsgIZGh6g67wJit0lZWPl273lfctOG3iF0OlQsSUnYl4XihzENMeleWJRnqTreOzWyEUs4OUdypOgg9mMegIqNRtU21ui2DWZX2OecWxl4MslS3wt5Q8MNYzD+aPSI6VbO+7NUKtlaP2PrDpfaNFPsDp9Ca9gpFyVSeyLjC4AkZYJJEHT9K2qKy2Zc6bpq7GK4YrXLGLxKcxXU2LpEylwFlV9NZMKp9TO8VllG2stjkyjao4x34+Jh8ZxG5hyl1EIYMys5zaxlhd4B36T9KzRpxlGzKa9adKeh54jxHhr+uIwalyZa5bcozHuehr1U5x2kQeIoz1nDXyKDiDWzcY2VZbemUMQSNBMkes1cvMyVHByeTYjV6QFAKAUAoBQCgFAKAUAoDo/2ecA5SjiF255Api2AZJkqJnQ9wO5B6VaoZVmZdh4ynLLH4mpx+IuXYLyoPmCqBHoWnc/pUt9z6WlQjBaMpeJ8JuXEJS4Mw2ERI9+9VzhJ8ka8W9THNi7qtHNg9mkVns3yYXUcXZOxqcDduLh5W4GdonUmdyVknQAZRv3q3SMbGeWIk5Wk7o/PvhjOVKlpMe52qEE2rszvcnJh794aeUATmZTr7Dc/09atSLI0ZSav/fyPceHktYfnI5d2aHzBTmWdQTGhlflA7VcqEKqsyqq6lCbT0ZZc9cTbZrvKsEFgMugCrudfhULlmd9doGWnE4bS9y7s/GujNQs2mZviLchwmXUyYkaLtmnsa5tnyfSd7BJOHJ84jNIuW7jDSBBOg18o7CSdBpRPgolhKWsoaZtXq7X9NvoeGCxseW7lOXVMyFlIEfhnoBuTPYVPjQzuCTeZed+jtv6kluK66E5TGURAiANtht/eaqym6lUUF6nxhOIZ3gg+ho42LKdfNKxbYTBPdjljWc2u0dZPQRSMXJ2RbUnGnDPJ2/kvOMWrdnD8u2RmeAwZTvqweQCGEqvtl3IYGunQp5LNLX0uvifL4zEyrS10XQxVjgttGH4pWNRAZo9BIH9a0yw/Ji7/AKlxZuuvlTzjuFI/TWoPDSH6hI+BiXUzlqDw0+gVeHU/Fx9wuGltAY6akR+m9P081wTVeD5IGMwTOoa51uQFULO28fQV5OllWpuwrU1/JNwXLQQsLHeR85j9alDKjr03CC0LTC8SaQqka6Fp6ddSauUk9j2eWaJlvitu3Zvm7C20dmlhIhgrfDqSQx6DpUXbk4uLjKElKO6V7nHuJ8StkXrKAtbN0tZYsZABOpkSfKSIP+LXYVmcYqTcTnd65U8st0UlCoUAoBQCgFAKAUAoBQCgFAS+F4Fr95LKlQXMSxgDqST2Ar2Ku7A7HdsW7djD4ey3kUnUA6lY11MfE01fLdI6/ZVP90iLirJZiuZz20EaegFeShfk6tiEEI6r7MgYfQn9K8yvqRkmQLXh25cupccBEIdg7WwFMEKSAomBm301iqlfNcySourPInqXfC+Bhy7XLrNZVTmdFiBp5V9TPaf38zoor4ONGCk5XfQ2WA8P4UIwty3lgOYJzAjc5fUe8GvVLXQpow8ScupT2m5dtb7qcsurEegOb/NBGtVRq3Vpbr+D6J06UM0IWTsn5+Xw0PTDcLIw6tLHmkuQQAAZcQPSI94mtuFl4n5nE7UkpRyy3T351X8FRxbCcvdScxAlek6SfTvWivNJJ2bV/l5nEotxbXkyQ+Iwl20Eu2irIrBmJJkrm2HSFCQoiZjoCcc8PCTun8ve/U2xxFWlBOPpY8eH+Gbbwti4TnkjUESC0hc2UxC6GTttWOeGdrnQo9qqLcZR239TyxHhEsA+ePNA8uhPl6T/ABjU6fQ1FUJbe/uaKmPobvQ+LHgswpa+oXmNbByH4lDMVOughT5jpp21r1YeRBY+lstScOAYWy5S5dPNSfJnQB4dkaDH5SskEjQ+hqSwrZ5/yNn4EWXE+KYazh35azZKZpIhwYK5SB8TGSOm4rfTwjpxcrar6nMqdoSq1Iuo9Gn8PbOPP4wxGZjltSTJm2s+kxEwNJ9Kj3s4t6fQyym5u7PK/wCLsW2zqn8qIP1iai6s3yRITcdxRBBxF7Xf8Rv71HvJdRY+P9s4nb7xe/7j/wB6d5LqzyyPw8XxH/Pu/wDcf+9O8n1YsXmC4q6YK4xuIGJCW1yiTBBZiY+LzKZOulSp5FGTluzSqs1Ba+h6YHxvcAAuIrfxDf6bVFVJI3U+1ZWtNXLIeOLGXS1cDHf4Y+Wxr3vn0NC7VpLh/T8lJxjxKLquoVvMuWSQABKMfLB18oEzVDUpSzSZkxHaCqRcUt1b6p/wZupnMFAKAUAoBQH/2Q==",
            ytUrl: "https://www.youtube.com/watch?v=BbX60C0E0P4&list=RDBbX60C0E0P4&start_radio=1"
          }
        ]
      },
      {
        name: "Senjata",
        data: [
          {
            name: "Golok",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Golok_naga_indonesia.jpg/500px-Golok_naga_indonesia.jpg"
          }
        ]
      },
      {
        name: "Makanan Khas",
        data: [
          {
            name: "Kerak Telor",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Kerak_telor_Betawi.jpg/330px-Kerak_telor_Betawi.jpg"
          }
        ]
      },
      {
        name: "Alat Musik",
        data: [
          {
            name: "Tehyan",
            image: "https://ik.imagekit.io/goodid/gnfi/uploads/articles/large-73097199-460853514540218-7858314336894600811-n-8b84b5c3fa2f492da87d1d921b1e8ed8.jpg?tr=w-730,h-486,fo-center"
          },
          {
            name: "Tanjidor",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Tanjidor%2C_by_M_Jeffry_Hanafiah.jpg/500px-Tanjidor%2C_by_M_Jeffry_Hanafiah.jpg"
          },
          {
            name: "Rebana",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/COLLECTIE_TROPENMUSEUM_Enkelvellige_lijsttrom_met_rinkelschijven_TMnr_1032-2.jpg/500px-COLLECTIE_TROPENMUSEUM_Enkelvellige_lijsttrom_met_rinkelschijven_TMnr_1032-2.jpg"
          }
        ]
      },
      {
        name: "Penggunaan Alat Musik",
        data: [
          {
            name: "Tehyan",
            ytUrl: "https://youtu.be/yUyYvlnVfwc?si=_J_TOjVtwxkfHT0C"
          },
          {
            name: "Tanjidor",
            ytUrl: "https://youtu.be/MHr-Pvb07m0?si=KDzS2NcYD2nMQzH9"
          },
          {
            name: "Rebana",
            ytUrl: "https://youtu.be/oaBmWUq57hg?si=uSgUUaoV2WGDeyJe",
          }
        ]
      },
      {
        name: "Lagu Daerah",
        data: [
          {
            name: "Ondel-ondel",
            ytUrl: "https://www.youtube.com/watch?v=wardyOl-EHo"
          },
          {
            name: "Jali-jali",
            ytUrl: "https://www.youtube.com/watch?v=iMuoAiycXp4"
          },
          {
            name: "Kicir-kicir",
            ytUrl: "https://youtu.be/lhZf7qGZzsE?si=1UmuxqCprEEHFDeD"
          }
        ]
      },
      {
        name: "Seni Pertunjukan",
        data: [
          {
            name: "Lenong",
            ytUrl: "https://www.youtube.com/watch?v=2YKZWQ4jEgI"
          }
        ]
      }
    ]
  },
  "32": {
    name: "Jawa Barat",
    capital: "Bandung",
    area: 35377,
    population: 48770000,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Coat_of_arms_of_West_Java.svg/129px-Coat_of_arms_of_West_Java.svg.png",
    cultures: [
      {
        name: "Rumah Adat",
        data: [
          {
            name: "Rumah Adat Togok Anjing",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8uTpXxdb5RXo8-A4B5rDk2-XIzVIU-fHTew&s"
          },
          {
            name: "Rumah Adat Kasepuhan Cirebon",
            image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01jmvpzbjrxa4b7rgt4pf6esj3.jpg"
          },
          {
            name: "Imah Julang Ngapak",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/COLLECTIE_TROPENMUSEUM_Huizen_in_Papandak_TMnr_60050402.jpg/330px-COLLECTIE_TROPENMUSEUM_Huizen_in_Papandak_TMnr_60050402.jpg"
          }
        ]
      },
      {
        name: "Baju Adat",
        data: [
          {
            name: "Pangsi",
            image: "https://www.dailysports.id/upload/large/974ae4a50ec53ee0ca78b0be4190a8e4.jpeg"
          }
        ]
      },
      {
        name: "Tarian",
        data: [
          {
            name: "Jaipong",
            image: "https://i.ytimg.com/vi/HVFnKlE42-I/maxresdefault.jpg",
            ytUrl: "https://www.youtube.com/watch?v=ZnfDoVWT2rc&list=RDZnfDoVWT2rc&start_radio=1"
          }
        ]
      },
      {
        name: "Senjata",
        data: [
          {
            name: "Kujang",
            image: "https://blog-static.mamikos.com/wp-content/uploads/2023/01/1.-Kujang.jpg.webp"
          }
        ]
      },
      {
        name: "Makanan Khas",
        data: [
          {
            name: "Karedok",
            image: "https://cnc-magazine.oramiland.com/parenting/images/Karedok.width-800.format-webp.webp"
          }
        ]
      },
      {
        name: "Alat Musik",
        data: [
          {
            name: "Angklung",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Indonesianbamboomusicangklung.jpg/281px-Indonesianbamboomusicangklung.jpg"
          },
          {
            name: "Suling",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Suling.jpg/1200px-Suling.jpg"
          }
        ]
      },
      {
        name: "Penggunaan Alat Musik",
        data: [
          {
            name: "Angklung",
            ytUrl: "https://youtu.be/RENOD--yd2c?si=EgLEHzdZCR8Jl9wM"
          },
          {
            name: "Suling",
            ytUrl: "https://youtube.com/shorts/5fIcMHHY0Xk?si=UBiaw0D_Vqd1zoj8 "
          },
        ]
      },
      {
        name: "Lagu Daerah",
        data: [
          {
            name: "Manuk Dadali",
            ytUrl: "https://www.youtube.com/watch?v=RENOD--yd2c"
          },
          {
            name: "Tokecang",
            ytUrl: "https://www.youtube.com/watch?v=atFo0JEblzo"
          }
        ]
      },
      {
        name: "Seni Pertunjukan",
        data: [
          {
            name: "Angklung Bungko",
            ytUrl: "https://www.youtube.com/watch?v=yz5p3f2jKLU"
          }
        ]
      }
    ]
  },
  "36": {
    name: "Banten",
    capital: "Serang",
    area: 9662, // dalam km²
    population: 12240000,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Coat_of_arms_of_Banten.svg/375px-Coat_of_arms_of_Banten.svg.png",
    cultures: [
      {
        name: "Rumah Adat",
        data: [
          {
            name: "Rumah Sulah Nyanda",
            image: "https://asset.kompas.com/crops/-Q5d_5nPmZcUPuwJgTs4KoK6RVU=/199x45:905x516/1200x800/data/photo/2023/04/28/644bb571da857.png"
          },
        ]
      },
      {
        name: "Baju Adat",
        data: [
          {
            name: "Pakaian Adat Banten untuk Pengantin",
            image: "https://sdn13.bimakota.sch.id/upload/kontent/1714461053_bbf0c8f552dd8349e89b.png"
          }
        ]
      },
      {
        name: "Tarian",
        data: [
          {
            name: "Tarian Cokek",
            image: "https://cilegonhills.id/wp-content/uploads/2021/03/Berbagai-Macam-Tarian-Tradisional-di-Banten-1200px-x-675px.jpg",
            ytUrl: "https://youtu.be/X_GeBXD21Fk"
          }
        ]
      },
      {
        name: "Senjata",
        data: [
          {
            name: "Golok Ciomas",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSI_jIa8dx7p139bc3baUHpOuz_mRH95z9Ng&s"
          }
        ]
      },
      {
        name: "Makanan Khas",
        data: [
          {
            name: " Sate Bandeng",
            image: "https://ppid.serangkota.go.id/po-content/uploads/img-20210330-wa0039.jpg"
          }
        ]
      },
      {
        name: "Alat Musik",
        data: [
          {
            name: "Pantun bambu",
            image: ""
          },
        ]
      },
      {
        name: "Penggunaan Alat Musik",
        data: [
          {
            name: "Pantun Bambu",
            ytUrl: "https://youtu.be/5qPEiCHJ2QM?si=Y5MY6v4RkBuDWWvl"
          },
        ]
      },
      {
        name: "Lagu Daerah",
        data: [
          {
            name: "Dayung sampan",
            ytUrl: "https://youtu.be/AlKPw_DL0Ao?si=g2JNsIkngQmeovdg"
          },
        ]
      },
      {
        name: "Seni Pertunjukan",
        data: [
          {
            name: "Debus Surosowan ",
            ytUrl: "https://www.youtube.com/watch?v=rtBDG5r_LOc"
          }
        ]
      }
    ]
  }
};

const ProvinceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const province = provincesData[id];

  const { setCurrentRegion, playMusic, pauseMusic } = useContext(MusicContext);
  const [isPlaying, setIsPlaying] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  useEffect(() => {
    setCurrentRegion(province.name); // Akan otomatis play saat masuk
    setIsPlaying(true);

    return () => {
      pauseMusic(); // Hentikan musik saat keluar
      setIsPlaying(false);
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      pauseMusic();
      setSnackbarMsg('Musik dijeda');
    } else {
      playMusic();
      setSnackbarMsg('Musik diputar');
    }
    setSnackbarOpen(true);
    setIsPlaying(!isPlaying);
  };


  if (!province) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" color="error">Provinsi tidak ditemukan!</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>Kembali</Button>
      </Box>
    );
  }

  const { name, capital, area, population, image, cultures } = province;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, py: 4 }}>
      {/* <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Kembali
      </Button> */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        message={snackbarMsg}
        onClose={() => setSnackbarOpen(false)}
      />

<Box
  sx={{
    position: 'fixed',
    top: 35,
    right: 16,
    zIndex: 1300, // pastikan muncul di atas konten
  }}
>
  <Button
    variant="contained"
    color={isPlaying ? 'warning' : 'primary'}
    onClick={handleTogglePlay}
    sx={{ boxShadow: 4 }}
  >
    {isPlaying ? 'Pause Musik' : 'Putar Musik'}
  </Button>
</Box>

      <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          sx={{ objectFit: 'contain', bgcolor: '#fafafa' }}
        />
      </Card>

      <Typography variant="h4" fontWeight="bold" gutterBottom>{name}</Typography>
      <Box mb={3}>
        <Typography><b>Ibu Kota:</b> {capital}</Typography>
        <Typography><b>Luas:</b> {area.toLocaleString()} km²</Typography>
        <Typography><b>Penduduk:</b> {population.toLocaleString()} jiwa</Typography>
      </Box>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>Budaya Daerah</Typography>

      {cultures.map((culture, i) => (
        <Box key={i} sx={{ mb: 4 }}>
          <Chip
            label={culture.name}
            color="primary"
            variant="outlined"
            sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }}
          />

          <Grid container spacing={2}>
            {culture.data.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
                  }}
                >
                  {item.image && (
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                      {item.name}
                    </Typography>
                    {item.ytUrl && (
                      <Tooltip title="Tonton di YouTube">
                        <Link
                          href={item.ytUrl}
                          target="_blank"
                          rel="noopener"
                          underline="hover"
                          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                        >
                          <YouTubeIcon color="error" fontSize="small" /> Tonton di YouTube
                        </Link>
                      </Tooltip>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ProvinceDetail;
