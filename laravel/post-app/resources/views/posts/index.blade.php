<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <title>Document</title>
</head>
<body>
    <div class="w-full md:w-auto md:flex-grow md:flex md:items-center">
      <a href="/post" rel="home">
          <svg class="w-10 h-10 text-purple-600" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
            <title>TailwindCSS</title>
            <path fill="currentColor" d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"></path>
          </svg>
        </a>
      <ul class="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:mr-4 lg:mr-8 md:border-0">
        <li>
          <a href="/post/create" class="block px-4 py-1 md:p-2 lg:px-4" title="Link">posting</a>
        </li>
      </ul>
    </div>

  <div class="p-16">
    <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 m-5 mb-10">

      @foreach ($posts as $key => $post)
        <div class="bg-white overflow-hidden hover:bg-green-100 border border-gray-200 p-3">
          <div class="m-2 text-justify text-sm">
              <p class="text-right text-xs">{{ $post->created_at }}</p>
              <h2 class="font-bold text-lg h-2 mb-8">{{ $post->title }}</h2>
              <p class="text-xs">
                {{ $post->content }}
              </p>
          </div>
          @if ($post->user_id === Auth::user()->id)
            <div class="w-full text-right mt-4">
              <a href="/post/modify" class="text-green-400 uppercase font-bold text-sm">수정하기</a>
              {{-- <a href="{{route('profile', ['id' => 1])}}" class="text-green-400 uppercase font-bold text-sm">삭제하기</a> --}}
            </div>
          @endif
        </div>
      @endforeach
    </div>
    <div>{{ $posts -> links() }}</div>
  </div>
</body>
</html>