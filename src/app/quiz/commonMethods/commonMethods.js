import { Text, View, Image, TouchableHighlight } from 'react-native';
import React from 'react';

export function validURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}

export function findUrlFromAnchorTag(item) {
  let linkString = '';
  let link = item.match(/<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g);
  if (link && link.length > 0) {
    link.map(item => {
      let x = item.match(/href\s*=\s*(['"])(https?:\/\/.+?)\1/g);
      if (x && x.length > 0) {
        x.map(item => {
          linkString = item.replace(/\'|href=/g, '');
        })
      }
    })
  }
  return linkString;
}

export function getImage(imagePart) {
  let imgResources = [], imageUrlArray = [];
  imagePart.forEach(item => {
    let getImageTag = item.match(/<img.*?src="(.*?)"[^\>]+>/g);
    if (getImageTag && getImageTag.length > 0) imgResources.push(getImageTag);
  })
  if (imgResources && imgResources.length > 0) {
    imgResources.map(item => {
      let imgUrl = item[0].match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);
      let imgCaption = item[0].match(/<img.*?caption="(.*?)"/);
      if (imgUrl && imgUrl.length > 0) {
        let obj = { url: imgUrl[0] };
        if (imgCaption && imgCaption.length > 0) obj.caption = imgCaption[1];
        imageUrlArray.push(obj);
      }
    });
  }
  return imageUrlArray;
}

export function getVideo(videoPart) {
  let videoResult = [], videoUrlArray = [];
  videoPart.forEach(item => {
    let temp = item.match(/\$root.displayResourceFullScreen(\(.*)\)/);
    let thumbnailTag = item.match(/<img.*?src="(.*?)"[^\>]+>/g);
    if (temp && temp.length > 0) {
      let obj = { videoDetail: temp };
      if (thumbnailTag && thumbnailTag.length > 0) {
        let thumbnailUrl = thumbnailTag[0].match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);
        if (thumbnailUrl && thumbnailUrl.length > 0) obj.thumbnail = thumbnailUrl[0]
      }
      videoResult.push(obj);
    }
  });
  if (videoResult && videoResult.length > 0) {
    videoResult.forEach(item => {
      videoString = item.videoDetail[0].replace(/&quot;/g, '');
      videoDetailArray = videoString.split(',');
      videoUrlArray.push({ url: videoDetailArray[4], thumbnail: item.thumbnail });
    });
  }
  return videoUrlArray;
}

export function renderImageComponent(dataObject) {
  return (<View style={[dataObject.classes.flexRowStartWrap]}>
    {dataObject.thumbnailUrlArray.map((item, index) => {
      return (
        <TouchableHighlight onPress={() => dataObject.onPressMethod(item)} key={index} style={{ padding: 3 }}>
          <Image source={{ uri: item.url }} style={{ height: dataObject.height, width: dataObject.width }} />
        </TouchableHighlight>
      )
    })}
  </View>);
}

export function renderVideoComponent(dataObject) {
  return (<View style={[dataObject.classes.flexRowStartWrap]}>
    {dataObject.thumbnailUrlArray.map((item, index) => {
      return (
        <TouchableHighlight onPress={() => dataObject.onPressMethod(item)} key={index} style={{ padding: 3 }}>
          <Image source={{ uri: item.thumbnail }} style={{ height: dataObject.height, width: dataObject.width }} />
        </TouchableHighlight>
      )
    })}
  </View>);
} 