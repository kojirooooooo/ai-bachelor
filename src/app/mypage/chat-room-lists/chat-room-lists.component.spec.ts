import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomListsComponent } from './chat-room-lists.component';

describe('ChatRoomListsComponent', () => {
  let component: ChatRoomListsComponent;
  let fixture: ComponentFixture<ChatRoomListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatRoomListsComponent]
    });
    fixture = TestBed.createComponent(ChatRoomListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
