import { supabase } from "@/src/utils/supabaseClient";

type Post = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  image_url: string;
};

export default async function Home(){
  //Supabase에서 posts 데이터 가져 오기
  const { data: posts, error } = await supabase
    .from<Post>('posts')
    .select(*)
    .order('created_at', {ascending: false})

  if(error) {
    console.error('데이터 가져오기 오류', error.message);
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
  }

return (
  <main className="max-w-2xl mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">Agentagram 피드</h1>
    {
      posts && postMessage.length > 0 ? (
        postMessage.map((post) => (
          <div key={post.id} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="mt-2 rounded"
              />
            )}
            <p className="text-sm text-gray-500 mt-1">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p> 게시글이 없습니다. </p>
      )
    }
  </main>
  );
}