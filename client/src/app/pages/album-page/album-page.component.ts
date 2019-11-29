import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
	albumId:string = '';
	album:AlbumData;
  tracks:TrackData[];
  image:string = '';
  externalurl:string ='';


  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');
    var atag = document.getElementsByClassName('btn btn-light')[0];
    var head = document.getElementsByTagName('h1')[0];
    var anchor = document.getElementsByTagName('a')[0];
  	//TODO: inject spotifyService and use it to get the album data and the tracks for the album
    var album = this.spotifyService.getAlbum(this.albumId);
    album.then( data => {
      this.externalurl = data['url'];

      atag.innerHTML = 'Open ' + data['name'] + ' on Spotify';
      head.innerHTML = data['name'] ;
      this.image = data['imageURL'];
    });

  }

}
