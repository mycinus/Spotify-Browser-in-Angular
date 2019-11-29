import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string = '';
	artist:ArtistData;
	relatedArtists:ArtistData[] = [];
	topTracks:TrackData[] = [];
  albums:AlbumData[] = [];
  externalurl:string = '';
  image:string = '';

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    

    var artist = this.spotifyService.getArtist(this.artistId);
    var relatedartists = this.spotifyService.getRelatedArtists(this.artistId);
    var albumss = this.spotifyService.getAlbumsForArtist(this.artistId);
    var h1Tag = document.getElementsByTagName('h1')[0];
    var tracks = document.getElementsByTagName('h3')[1];
    var albums = document.getElementsByTagName('h3')[2];

    var h1Tag = document.getElementsByTagName('h1')[0];

    var image = document.getElementById("artistImg");
    var externallink = document.getElementsByClassName("btn btn-light")[0];


    artist.then( data => {
      this.externalurl = data['external_urls']['spotify'];

      h1Tag.innerHTML = data['name'];
      tracks.innerHTML = data['name'] + "'s Top Tracks";
      albums.innerHTML = data['name'] + "'s Albums";
      externallink.innerHTML = 'Open '+ data['name'] + ' on Spotify';

      // image
      var imageurl = data['images'][0];
      this.image = imageurl['url'];


      // Genres 
      var genres = data['genres']
      var ulgenre = document.getElementById('genre');
      if( genres.length > 0) { 

        for( var i = 0; i < genres.length; i++) {

          var item = document.createElement('li');
          item.innerHTML = genres[i];
          ulgenre.appendChild(item);
        }

      }

    });


    relatedartists.then( data => {

      for( var i = 0; i < data.length; i++) {

        this.relatedArtists.push(data[i]);

      }

  });


  albumss.then( data => {

    for( var i = 0; i < data.length; i++) {

      this.albums.push(data[i]);

    }

});


}

}