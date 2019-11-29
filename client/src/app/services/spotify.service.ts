declare var require: any

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
//import { PassThrough } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string) :Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server

     var data;

    //  fetch( webserver_url )
    //   .then( ( response ) => {

    //      data = response.json();  
    //      console.log('DATA from fetch', data);      
    //      return Promise.resolve(data);

    //    })


      const webserver_url = this.expressBaseUrl + endpoint;
      data = this.http.get(webserver_url);

      //console.log('FINNER',  data.toPromise());
      //return Promise.resolve(data.toPromise());
      // data.toPromise().then( result => {
      //   console.log('a promise', result);
      //   return Promise.resolve(result);
      //  });
 
    


    // const http = new XMLHttpRequest();
    // http.open("GET", webserver_url);
    // http.send();

    // http.onload =function() {
    //   if( http.DONE ){
    //     console.log('XMLXMLXMLXML', http.responseText);
    //     console.log(typeof(http.responseText));
    //     console.log('######################################')
    //     console.log(Promise.resolve(http.responseText)['__zone_symbol__value']);
    //     data = http.responseText;
    //     return Promise.resolve(http.responseText);
    //   }
      
    // }

    
    // console.log('typeof data', typeof(data));
    // console.log('dont tell me it happened after', http.responseText);
   // data = this.http.get(webserver_url);
    //console.log('What is this data from sendRequesttoExpress', data);

    // console.log('smelly', result);
    // data.toPromise().then( result => {
    //   //console.log('a promise', result);
    //   return Promise.resolve(result);
    //  });
    return Promise.resolve(data.toPromise());

  }


  aboutMe(){//}:Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then( (data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    
    
    //(e.g., returns at least one artist/track/album).
    var artists = [];
    var albums = [];
    var tracks = [];

    var encodedurl = encodeURIComponent( resource );

    if( category == 'artist' ) {    //artist data

      var artistEndpoint = '/search' + '/' + category + '/' + encodedurl;
      return this.sendRequestToExpress( artistEndpoint ).then( (data) => {

        var artistArray = data['artists']['items'];
        for( var i = 0; i < artistArray.length; i++ ){

          var artist = new ArtistData(artistArray[i]);

          artists.push(artist);
        }

        return artists;
      });


    } else if ( category == 'album') { //album data
      
      var albumEndpoint = '/search' + '/' + category + '/' + encodedurl;
      return this.sendRequestToExpress( albumEndpoint ).then( (data) => {
        var albumArray = data['albums']['items'];
        for( var i = 0; i < albumArray.length; i++ ){

          var album = new AlbumData(albumArray[i]);

          albums.push(album);
        }

        return Promise.resolve(albums);
      });


    } else if ( category == 'track') { //track data

      var trackEndpoint = '/search' + '/' + category + '/' + encodedurl;
      return this.sendRequestToExpress( trackEndpoint ).then( (data) => {
        var trackArray = data['tracks']['items'];
        for( var i = 0; i < trackArray.length; i++ ){

          var track = new TrackData(trackArray[i]);

          tracks.push(track);
        }

        return Promise.resolve(tracks);
      });



    }
    return null;
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    var encodedId = encodeURIComponent( artistId );
    var artistEndpoint = '/artist/' + encodedId;

    return this.sendRequestToExpress( artistEndpoint ).then( (data) => {

        return Promise.resolve(data);
      });

  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    var encodedId = encodeURIComponent( artistId );
    var artistEndpoint = '/artist-related-artists/' + encodedId;
    var related = [];

    return this.sendRequestToExpress( artistEndpoint ).then( (data) => {
      var relatedArray = data['artists'];


      for( var i = 0; i < relatedArray.length; i++ ){

        var artist = new ArtistData(relatedArray[i]);
        related.push(artist);
      
      }
      
      return Promise.resolve(related);

    });
   
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express. artist-top-tracks
    var encodedId = encodeURIComponent( artistId );
    var artistEndpoint = '/artist-top-tracks/' + encodedId;
    
    return null;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    var encodedId = encodeURIComponent( artistId );
    var artistEndpoint = '/artist-albums/' + encodedId;
    var albums = [];

    return this.sendRequestToExpress( artistEndpoint ).then( (data) => {
      var items = data['items'];

      for( var i = 0; i < items.length; i++ ){

        var album = new AlbumData(items[i]);
        albums.push(album);

      }
      return Promise.resolve(albums);

    });

  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    var encodedId = encodeURIComponent( albumId );
    var album = '/album/' + encodedId;
    return this.sendRequestToExpress( album ).then( (data) => {

      var result = new AlbumData(data);

      return Promise.resolve(result);
    });

  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return null;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return null;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return null;
  }
}
